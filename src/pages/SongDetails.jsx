import { useState, useEffect, useContext } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { Songs, SongLyrics } from "../components/List";

import { useGetLyricsQuery } from "../redux/services/MusixMatchApi";
import { useGetSongDetailsQuery, useGetSongsQuery } from "../redux/services/DeezerApi";
import { getSingleData } from "../functions/getData";
import { DetailsContext } from "../components/Details";


const SongDetails = () => {
    const { blacklist, favorites } = useSelector( state => state.library )

    const { data, updateData, colors, ...others } = useContext(DetailsContext)
    const [lyrics, setLyrics] = useState([])

    const { songid } = useParams()

    const { data: song, isFetching, error } = useGetSongDetailsQuery( songid )
    const { data: lyricsData, isFetching: isFetchingLyrics, error: errorFetchingLyrics } = useGetLyricsQuery( data?.isrc || 0 )
    const { data: relatedSongs, isFetching: isFetchingRelated, error: errorFetchingRelated } = useGetSongsQuery( data?.artist?.tracklist.match(/[\d]+/) || 0, 20)

    useEffect(() => {
        const refinedData = getSingleData({ type: 'tracks', data: song, favorites, blacklist })
        updateData({ ...others, colors, isFetching, error, data: {...refinedData, song: refinedData, tracks: [refinedData]} })
    }, [song, favorites, blacklist])

    useEffect(() => {
        const text = `Ridm Song - ${isFetching ? 'Loading...' : error ? 'Could not load data' : song?.title}`
        document.getElementById('site_title').innerText = text
    }, [song])

    useEffect(() => {
        setLyrics(
            lyricsData?.message?.body?.lyrics?.lyrics_body
            .replace(/(\*{7}[a-z|\s]+\*{7}|\(\d+\))/ig, '')
            .split('\n')
        )
    }, [lyricsData])

    return (
        <div className="relative z-1">
            <div className="p-2 md:p-4 flex flex-col md:flex-row items-stretch md:items-start justify-stretch">
                <div className="flex-1">
                    <SongLyrics isFetching={isFetchingLyrics} error={isFetchingLyrics} lyrics={lyrics} lyricsData={lyricsData} />
                </div>
                <div className="flex-1">
                    <Songs 
                        full={true}
                        bg={colors.length > 0 && colors[1]}
                        blacklist={blacklist} 
                        favorites={favorites}
                        isFetching={isFetchingRelated} 
                        error={errorFetchingRelated} 
                        songData={data} 
                        songs={relatedSongs?.data?.slice(0, 6)}
                    >
                        Similar Song
                    </Songs>
                </div>
            </div>
        </div>
    )
};

export default SongDetails;
