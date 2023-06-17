import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { DetailsHeader} from "../components/Headers";
import { Options } from "../components/Options";
import { Songs, SongLyrics } from "../components/List";
import { FavoriteButton, PauseButton, PlayButton, PlayNextButton } from "../components/Buttons";

import { useGetLyricsQuery } from "../redux/services/MusixMatchApi";
import { useGetSongDetailsQuery, useGetSongsQuery } from "../redux/services/DeezerApi";
import { getSingleData } from "../functions/getData";
import { addBlacklist } from "../functions/library";


const SongDetails = () => {
    const { activeSong, isPlaying, } = useSelector( (state) => state.player )
    const { blacklist, favorites } = useSelector( state => state.library )

    const [data, setData] = useState({})
    const [lyrics, setLyrics] = useState([])

    const { songid } = useParams()

    const { data: song, isFetching, error } = useGetSongDetailsQuery( songid )
    const { data: lyricsData, isFetching: isFetchingLyrics, error: errorFetchingLyrics } = useGetLyricsQuery( data?.isrc || 0 )
    const { data: relatedSongs, isFetching: isFetchingRelated, error: errorFetchingRelated } = useGetSongsQuery( data?.artist?.tracklist.match(/[\d]+/) || 0, 20)

    useEffect(() => {
        setData(getSingleData({type: 'tracks', data: song, favorites, blacklist}))
    }, [song, favorites, blacklist])

    useEffect(() => {
        setLyrics(
            lyricsData?.message?.body?.lyrics?.lyrics_body
            .replace(/(\*{7}[a-z|\s]+\*{7}|\(\d+\))/ig, '')
            .split('\n')
        )
    }, [lyricsData])

    return (
        <div className="">
            <DetailsHeader isFetching={isFetching} error={error} songData={data} />

            <div className="flex flex-col lg:flex-row flex-wrap justify-between items-start lg:items-center px-6 mt-4 lg:mt-1">
                <div className="flex-1 flex flex-row items-center justify-start gap-2 xl:gap-4">
                    {
                        isPlaying && activeSong.id === data?.id ?  
                        <PauseButton />:
                        <PlayButton song={data} tracks={[data]} i={0} />
                    }
                    <PlayNextButton tracks={[data]} />
                </div>
                
                <div className="relative flex flex-row items-center gap-4 my-4">
                    <FavoriteButton data={data} type={"tracks"} />
                    <Options 
                        type="track" 
                        song={data} 
                        i={0} 
                        favorite={data?.favorite}
                        tracks={[data]} 
                        artist={data?.artist} 
                        album={data?.album}
                        blacklist={data?.blacklist} 
                    />
                </div>
            </div>
            
            <div className="p-2 md:p-4">
                <SongLyrics isFetching={isFetchingLyrics} error={isFetchingLyrics} lyrics={lyrics} lyricsData={lyricsData} />
                <Songs 
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
    )
};

export default SongDetails;
