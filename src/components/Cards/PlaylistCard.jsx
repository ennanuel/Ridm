import { Link } from "react-router-dom"

const PlaylistCard = ({i, playlist, params, handlePlaylist, checkedBoxes}) => {
  return (
    <Link to={`/playlists/${playlist.id}`} onClick={(e) => (params && params.get('edit') === 'true') && handlePlaylist(playlist.id, e)}>
      <div className="relative bg-white/10 rounded-md h-[200px] overflow-hidden shadow-lg shadow-black/50">
        {
          (params.get('edit') === 'true') &&
          <input 
            type="checkbox" 
            className="absolute z-[10] bg-[black] top-2 right-2 w-[30px] h-[30px]" 
            checked={checkedBoxes?.includes(playlist.id) || false}
          />
        }
        {
          playlist.tracks.length > 0 &&
          <img 
            src={playlist.tracks[0].album.cover_medium} 
            className="absolute w-full h-full object-cover top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]" 
            alt="" 
          />
        }
        <div className="relative h-full w-full px-4 py-2 bg-black/70 flex flex-col items-start justify-end">
          <span className="text-gray-400 text-xs font-semibold">playlist</span>
          <span className="text-white text-md font-semibold truncate w-full block">{playlist.name}</span>
        </div>
      </div>
    </Link>
  )
}

export default PlaylistCard
