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
        <div className="m-2 md:m-4 rounded-[20px] bg-black/20 backdrop-blur-md border border-white/5">
          <table className="w-full overflow-x-clip">
            <thead>
              <tr className="px-4 py-4 h-[50px] md:h-[60px]">
                <th className="w-[7%]"></th>
                <th className="w-[66%] text-left text-white/80 font-bold text-xl">Tracks</th>
                <th className="w-[10%] text-white/80"><BiTime size={25} /></th>
                <th className="w-[10%]"></th>
                <th className="w-[7%]"></th>
              </tr>
            </thead>
            {
              allTracks?.map((song, i, songs) => (
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
        </div>
  );
}

export default AllTracks;
