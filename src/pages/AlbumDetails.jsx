import { useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { Albums, Tracks } from '../components/List'
import { DetailsHeader } from '../components/Headers'
import { Error, Loader } from '../components/LoadersAndError'
import { Options } from "../components/Options";

import { FavoriteButton, ShuffleButton, PlayButton } from "../components/Buttons";
import { pause, playSongs } from "../functions/player";

import { useGetAlbumDetailsQuery, useGetAlbumsQuery } from "../redux/services/DeezerApi";
import { getSingleData } from "../functions/getData";

const AlbumDetails = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState([])
  
  const { activeSong, isPlaying } = useSelector( (state) => state.player )
  const { favorites, blacklist } = useSelector( state => state.library )

  const { id: albumid } = useParams()

  const { data: album, isFetching, error } = useGetAlbumDetailsQuery( albumid )
  const { data: relatedAlbums, isFetching: isFetchingRelatedAlbums, error: errorFetchingRelatedAlbums } = useGetAlbumsQuery( album?.genre_id )

  const [albumTracks, setAlbumTracks] = useState([])

  const handlePause = () => {
    pause(dispatch)
  }

  const handlePlay = (song, i) => {
    const {tracks, contributors, genres, artist, ...album} = data;
    playSongs({dispatch, tracks: albumTracks, song, i, album})
  }

  useEffect(() => {
    const text = `Ridm Album - ${isFetching ? 'Loading...' : error ? 'Something went wrong' : album?.title}`
    setAlbumTracks(album?.tracks?.data)
    document.getElementById('site_title').innerText = text
  }, [album])

  useEffect(() => {
    setData(getSingleData({data: album, type: 'albums', favorites, blacklist}))
  }, [album, favorites, blacklist])

  return (
    <div className="flex flex-col">
        <DetailsHeader isFetching={isFetching} error={error} albumData={data} />

        <div className="relative mb-4">
          <div className=" flex flex-col lg:flex-row flex-wrap justify-between items-start lg:items-center gap-3 p-4">
            <div className="flex-1 flex flex-row items-center justify-start gap-4">
              <PlayButton album={data} tracks={albumTracks} song={albumTracks ? albumTracks[0] : {}} i={0} />
              <ShuffleButton album={data} tracks={albumTracks} />
            </div>
            
            <div className="flex-1 flex flex-row justify-end items-center gap-4 overflow-x-clip">
              <FavoriteButton data={data} type="albums" />
              <Options 
                type="album" 
                favorite={data?.favorite} 
                blacklist={data?.blacklist}
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
