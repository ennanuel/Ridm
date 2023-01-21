import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useGetLyricsQuery } from "../redux/services/MusixMatchApi";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"
import { setActiveSong, playPause } from "../redux/features/playerSlice"
import { useGetSongDetailsQuery, useGetRelatedSongsQuery } from "../redux/services/DeezerApi";

const SongDetails = () => {
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector( (state) => state.player )
    const { songid } = useParams()
    const { data, isFetching, error } = useGetSongDetailsQuery( songid )
    const { data: lyricsData } = useGetLyricsQuery( data?.isrc || 0 )
    const { data: relatedSongs } = useGetRelatedSongsQuery( data?.artist?.tracklist.match(/[\d]+/) || 0, 20)

    const handlePauseClick = () => {
      dispatch(playPause(false))
    }
    const handlePlayClick = (song, i, tracks) => {
      dispatch(setActiveSong({ song, tracks, i}))
      dispatch(playPause(true))
    }

    const lyrics = lyricsData?.message?.body?.lyrics?.lyrics_body
        .replace(/\*{7}[a-z|\s]+\*{7}/ig, '')
        .split('\n')

    if( isFetching ) return <Loader title="Loading song details" />

    if( error ) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId="" songData={data} />

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics</h2>

                <div className="mt-5">
                    {
                        lyrics ?
                        lyrics.map( line => <p className="text-gray-400 text-base my-1">{line}</p> ) :
                        "Sorry, no lyrics found!"
                    }

                    <p className="text-sm text-white">{ lyricsData?.message?.body?.lyrics?.lyrics_copyright }</p>
                </div>
            </div>

            <RelatedSongs
                songData={data}
                songs={relatedSongs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlayClick={handlePlayClick}
                handlePauseClick={handlePauseClick}
            />
        </div>
    )
};

export default SongDetails;
