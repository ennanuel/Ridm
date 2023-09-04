import { useParams } from "react-router-dom";

import { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux"

import { Albums, Tracks } from '../components/List'
import { pause, playSongs } from "../functions/player";

import { useGetAlbumDetailsQuery, useGetAlbumsQuery } from "../redux/services/DeezerApi";
import { getSingleData } from "../functions/getData";
import { DetailsContext } from "../components/Details";

const AlbumDetails = () => {
  const dispatch = useDispatch()
  const { data, updateData, ...others } = useContext(DetailsContext)
  
  const { activeSong, isPlaying } = useSelector( (state) => state.player )
  const { favorites, blacklist } = useSelector( state => state.library )

  const { id: albumid } = useParams()

  const { data: album, isFetching, error } = useGetAlbumDetailsQuery( albumid )
  const { data: relatedAlbums, isFetching: isFetchingRelatedAlbums, error: errorFetchingRelatedAlbums } = useGetAlbumsQuery( album?.genre_id )


  const handlePause = () => {
    pause(dispatch)
  }

  const handlePlay = (song, i) => {
    const {tracks, contributors, genres, artist, ...album} = data;
    playSongs({dispatch, tracks, song, i, album})
  }

  useEffect(() => {
    const text = `${isFetching ? 'Loading Album...' : error ? 'Something went wrong' : `Album: ${album?.title} by ${album?.artist?.name}`}`
    document.getElementById('site_title').innerText = text
  }, [isFetching, error])

  useEffect(() => {
    const refinedData = getSingleData({ data: album, type: 'albums', favorites, blacklist })
    updateData({ ...others, isFetching, error, data: {...refinedData, song: refinedData?.tracks && refinedData.tracks[0]} })
  }, [album, favorites, blacklist])

  return (
    <div className="flex flex-col">
        <div className="relative mb-4">
          <Tracks 
            isFetching={isFetching}
            tracks={data?.tracks} 
            album={data} 
            activeSong={activeSong} 
            isPlaying={isPlaying} 
            handlePause={handlePause} 
            handlePlay={handlePlay} 
            favorites={favorites}
            blacklist={blacklist}
          />
        </div>
      <div className="p-2 md:p-4">
        <Albums
          favorites={favorites}
          blacklist={blacklist}
          isFetching={isFetchingRelatedAlbums}
          error={errorFetchingRelatedAlbums}
          albums={relatedAlbums?.data || []}
          album={data}
        >
          Similar Albums
        </Albums>
      </div>
    </div>
  )
}

export default AlbumDetails
