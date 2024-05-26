import { PlaylistCard } from '../Cards/'

const Playlists = ({ playlistid, playlists }) => {

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {
        playlists
          .filter( playlist => playlist.id != playlistid )
          .map( 
            (playlist, i) => <PlaylistCard i={i} playlist={playlist} key={i} /> 
          )
      }
    </div>
  )
}

export default Playlists
