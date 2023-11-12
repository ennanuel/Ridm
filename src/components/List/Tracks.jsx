import { useEffect , useMemo, useState} from 'react'
import { useSearchParams } from 'react-router-dom'

import { BiTime } from 'react-icons/bi'

import Track from './Track'
import { Loader, Error } from '../LoadersAndError'

import { getData } from '../../utils/getData'
import { useSelector } from 'react-redux'

const AllTracks = ({ tracks, activeSong, isPlaying, isFetching, error, songsToBeDeleted, handleTrack, editDataTracks, playlist }) => {
  const { playlists, ...library } = useSelector(state => state.library);
  const [params, setParams] = useSearchParams();
  const isEditing = useMemo(() => params.get('edit') === 'true', [params]);
  const [allTracks, setAllTracks] = useState([]);

  useEffect(() => {
    const tracksToUse = isEditing ? editDataTracks : tracks;
    const tracksData = getData({ type: 'tracks', data: tracksToUse });
    setAllTracks(tracksData);
  }, [params, playlist, library, editDataTracks, tracks]);

  return (
    isFetching ?
    <Loader title="Fetching album tracks..." /> :
    error ?
    <Error title="Could not fetch album details" /> :
    <table className="w-full overflow-x-clip">
      <thead className="bg-white/10">
        <tr className="px-4 py-4 h-[50px]">
          <th className="w-[7%]"></th>
          <th className="w-[66%] text-left text-white font-bold text-xl">Tracks</th>
          <th className="w-[10%] text-white"><BiTime size={30} /></th>
          <th className="w-[10%]"></th>
          <th className="w-[7%]"></th>
        </tr>
      </thead>
      {
        allTracks?.map( (song, i, songs) => (
          <Track 
            i={i}
            key={i}
            tracks={songs}
            song={song} 
            activeSong={activeSong} 
            edit={isEditing}
            handleTrack={handleTrack}
            songsToBeDeleted={songsToBeDeleted}
            isPlaying={isPlaying}
            playlists={playlists}
            playlist={playlist}
          />
        ))
      }
    </table>
  )
}

export default AllTracks;
