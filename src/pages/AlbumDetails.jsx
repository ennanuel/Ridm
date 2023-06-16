import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux"

import { Albums, Tracks } from '../components/List'
import { DetailsHeader } from '../components/Headers'
import { Error, Loader } from '../components/LoadersAndError'
import { Options } from "../components/Options";

import { FavoriteButton, ShuffleButton, PlayButton } from "../components/Buttons";
import { pause, playSongs } from "../functions/player";

import { useGetAlbumDetailsQuery, useGetAlbumsQuery, useGetAlbumTracksQuery } from "../redux/services/DeezerApi";

const AlbumDetails = () => {
  const dispatch = useDispatch()

  const { favorites: {albums, tracks: favSongs, ...others} } = useSelector( (state) => state.library )
  const { activeSong, isPlaying } = useSelector( (state) => state.player )

  const { id: albumid } = useParams()

  const { data, isFetching, error } = useGetAlbumDetailsQuery( albumid )
  const { data: relatedAlbums, isFetching: isFetchingRelatedAlbums, error: errorFetchingRelatedAlbums } = useGetAlbumsQuery( data?.genre_id )
  const albumTracks = data?.tracks?.data

  const handlePause = () => {
    pause(dispatch)
  }

  const handlePlay = (song, i) => {
    const {tracks, contributors, genres, artist, ...album} = data;
    playSongs({dispatch, tracks: albumTracks, song, i, album})
  }

  if( isFetching ) return <Loader title="Loading album details" />

  if( error ) return <Error />

  return (
    <div className="flex flex-col">
        <DetailsHeader isFetching={isFetching} error={error} albumData={data} />

        <div className="relative">
          <div className=" flex flex-col lg:flex-row flex-wrap justify-between items-start lg:items-center gap-3 p-4">
            <div className="flex-1 flex flex-row items-center justify-start gap-4">
              <PlayButton album={data} tracks={albumTracks} song={albumTracks ? albumTracks[0] : {}} i={0} />
              <ShuffleButton album={data} tracks={albumTracks} />
            </div>
            
            <div className="flex-1 flex flex-row justify-end items-center gap-4 overflow-x-clip">
              <FavoriteButton data={data} type={'albums'} favorite={data.favorite} />
              <Options 
                type="album" 
                favorite={albums.map(album => album.id).includes(data?.id)} 
                album={data} 
                tracks={albumTracks} 
                song={albumTracks ? albumTracks[0] : []} 
                artist={data?.artist} 
                i={0} 
              />
            </div>
          </div>
          <Tracks 
            isFetching={isFetching}
            tracks={albumTracks} 
            album={data} 
            activeSong={activeSong} 
            isPlaying={isPlaying} 
            favSongs={favSongs} 
            handlePause={handlePause} 
            handlePlay={handlePlay} 
          />
        </div>

        <Albums
          isFetching={isFetchingRelatedAlbums}
          error={errorFetchingRelatedAlbums}
          albums={relatedAlbums?.data || []}
          album={data}
        >
          Similar Albums
        </Albums>

        <p className="text-gray-400 mx-4 mt-2 mb-5 text-sm font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nulla quaerat, a atque, repellendus quam explicabo ipsa qui in id ducimus earum architecto numquam vero rem at doloremque sapiente? Mollitia.</p>
        <p className="text-gray-400 mx-4 mt-2 mb-5 text-sm font-normal">Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio nulla quaerat, a atque, repellendus quam explicabo ipsa qui in id ducimus earum architecto numquam vero rem at doloremque sapiente? Mollitia.</p>
        
    </div>
  )
}

export default AlbumDetails
