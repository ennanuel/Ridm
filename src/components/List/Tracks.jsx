import { useEffect , useState} from 'react'
import { useSearchParams } from 'react-router-dom'

import { BiTime } from 'react-icons/bi'

import Track from './Track'
import { Loader, Error } from '../LoadersAndError'

import { getData } from '../../functions/getData'

const AllTracks = ({ tracks,  activeSong, isPlaying, isFetching, error, songsToBeDeleted, handleTrack, editDataTracks, playlists, playlist, blacklist, favorites }) => {
  const [params, setParams] = useSearchParams()
  const [allTracks, setAllTracks] = useState([])

  useEffect(() => {
    setAllTracks(getData({ type: 'tracks', data: params.get('edit') === 'true' ? editDataTracks : tracks, blacklist, favorites }))
  }, [params, playlist, favorites, blacklist, editDataTracks, tracks])

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
        allTracks.map( (song, i, songs) => (
          <Track 
            i={i}
            key={i}
            tracks={songs}
            song={song} 
            activeSong={activeSong} 
            edit={params && (params.get('edit') === 'true')}
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
