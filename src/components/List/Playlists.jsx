import { useSearchParams } from 'react-router-dom'
import { PlaylistCard } from '../Cards/'

const Playlists = ({ handlePlaylist, checkBoxes, playlistid, playlists }) => {
  const [params, setParams] = useSearchParams()

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-6 md:gap-4 gap-2">
      {
        playlists
          .filter( playlist => playlist.id !== playlistid )
          .map( 
            (playlist, i) => <PlaylistCard checkBoxes={checkBoxes} params={params} handlePlaylist={handlePlaylist} i={i} playlist={playlist} key={i} /> 
          )
      }
    </div>
  )
}

export default Playlists
