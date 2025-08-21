import { useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { Songs, SongLyrics } from "../components/List";

import { useGetSongDetailsQuery, useGetSongsQuery } from "../redux/services/DeezerApi";

import { getSingleData } from "../utils/getData";
import { DetailsContext } from "../components/Details";


const SongDetails = () => {
    const { blacklist, favorites } = useSelector( state => state.library );

    const { data, updateData, colors, ...others } = useContext(DetailsContext);

    const { songid } = useParams();

    const { data: song, isFetching, error } = useGetSongDetailsQuery( songid );
    const { data: relatedSongs, isFetching: isFetchingRelated, error: errorFetchingRelated } = useGetSongsQuery( data?.artist?.tracklist.match(/[\d]+/) || 0, 20);

    useEffect(() => { 
        updateData({ isFetching: true, error: false, data: {}, colors: [] })
    }, [songid]);
    
    useEffect(() => {
        const refinedData = getSingleData({ type: 'tracks', data: song, favorites, blacklist })
        updateData({ ...others, colors, isFetching, error, data: {...refinedData, song: refinedData, tracks: [refinedData]} })
    }, [song, favorites, blacklist]);

    useEffect(() => {
        const text = `Ridm Song - ${isFetching ? 'Loading...' : error ? 'Uh oh! Song data could not be loaded :(' : song?.title}`
        document.getElementById('site_title').innerText = text
    }, [song, isFetching, error]);

    return (
        <div className="min-h-[100vh] p-2 md:p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <section>
                <SongLyrics showBlur={true} songId={songid} />
            </section>
            <section>
                <div className="md:sticky md:top-[85px]">
                    <Songs
                        full={true}
                        bg={colors?.length > 0 && colors[1]}
                        bg2={colors?.length > 0 && colors[0]}
                        blacklist={blacklist}
                        favorites={favorites}
                        isFetching={isFetchingRelated}
                        error={errorFetchingRelated}
                        songData={data}
                        songs={relatedSongs?.data?.filter(song => song.id != songid)?.slice(0, 6)}
                    >
                        Similar Songs
                    </Songs>
                </div>
            </section>
        </div>
    )
};

export default SongDetails;
