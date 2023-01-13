import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"
import { setActiveSong, playPause } from "../redux/features/playerSlice"
import { useGetArtistDetailsQuery, useGetRelatedSongsQuery } from "../redux/services/DeezerApi";

const ArtistDetails = () => {
    const dispatch = useDispatch()
    const { activeSong, isPlaying } = useSelector( (state) => state.player )
    const { id: artistid } = useParams()
    const { data, isFetching, error } = useGetArtistDetailsQuery( artistid )
    const { data: relatedSongs } = useGetRelatedSongsQuery( data?.tracklist.match(/[\d]+/)[0] || 0, 50)

    const handlePauseClick = () => {
      dispatch(playPause(false))
    }
    const handlePlayClick = (song, i, tracks) => {
      dispatch(setActiveSong({ song, tracks, i}))
      dispatch(playPause(true))
    }

    if( isFetching ) return <Loader title="Loading artist details" />

    if( error ) return <Error />

    return (
        <div className="flex flex-col">
            <DetailsHeader artistId={artistid} artistData={data} />

            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Albums by {data?.name}</h2>

                <div className="mt-5">
                    {/* {
                        lyrics ?
                        lyrics.map( line => <p className="text-gray-400 text-base my-1">{line}</p> ) :
                        "Sorry, no lyrics found!"
                    } */}

                    <p className="text-sm text-white">{  }</p>
                </div>
            </div>

            <RelatedSongs
                songs={relatedSongs}
                isPlaying={isPlaying}
                activeSong={activeSong}
                handlePlayClick={handlePlayClick}
                handlePauseClick={handlePauseClick}
                artist={data}
                artistId={artistid}
            />
        </div>
    )
};

export default ArtistDetails;
