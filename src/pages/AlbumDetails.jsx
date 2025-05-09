import { useParams } from "react-router-dom";

import { useEffect, useContext } from "react";
import { useSelector } from "react-redux"

import { Albums, Tracks } from '../components/List'
import { pause, playSongs } from "../utils/player";

import { useGetAlbumDetailsQuery, useGetAlbumsQuery } from "../redux/services/DeezerApi";
import { getSingleData } from "../utils/getData";
import { DetailsContext } from "../components/Details";

const AlbumDetails = () => {
  const { data, updateData, ...others } = useContext(DetailsContext)
  
  const { activeSong, isPlaying } = useSelector( (state) => state.player )
  const { favorites, blacklist } = useSelector( state => state.library )

  const { id: albumid } = useParams()

  const { data: album, isFetching, error } = useGetAlbumDetailsQuery( albumid )
  const { data: relatedAlbums, isFetching: isFetchingRelatedAlbums, error: errorFetchingRelatedAlbums } = useGetAlbumsQuery( album?.genre_id )

  const handlePlay = (song, i) => {
    const {tracks, contributors, genres, artist, ...album} = data;
    playSongs({ tracks, song, i, album });
  }
  
  useEffect(() => { 
    updateData({ isFetching: true, error: false, data: {}, colors: [] });
  }, [albumid])

  useEffect(() => {
    const text = isFetching ?
      'Loading details...' :
      error ?
        'Uh Oh, Something went wrong' :
        `${album?.title} by ${album?.artist?.name}`;

    document.getElementById('site_title').innerText = `Ridm Album - ${text}`;
  }, [isFetching, error])

  useEffect(() => {
    const refinedData = getSingleData({ data: album, type: 'albums', favorites, blacklist });
    updateData({ ...others, isFetching, error, data: { ...refinedData, song: refinedData?.tracks && refinedData.tracks[0] } });
  }, [album, favorites, blacklist])

  return (
    <div className="flex flex-col gap-4">
          <Tracks 
            isFetching={isFetching}
            tracks={data?.tracks} 
            album={data} 
            activeSong={activeSong} 
            isPlaying={isPlaying} 
            handlePause={pause} 
            handlePlay={handlePlay} 
            favorites={favorites}
            blacklist={blacklist}
          />
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
