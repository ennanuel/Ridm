import { Link } from "react-router-dom"
import { Options } from "../Options"

const PlaylistCard = ({ i, playlist }) => {
  return (
    <div style={{animationDelay: i / 20 + 's', animationFillMode: 'forwards'}} className="relative animate-slideleft opacity-0">
      <Link to={`/playlists/${playlist.id}`}>
        <div className="relative bg-white/10 rounded-md h-[200px] overflow-hidden shadow-lg shadow-black/50">
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
      <div className="absolute z-[1] top-2 right-2">
        <Options tracks={playlist.tracks} song={playlist.tracks[0]} i={0} playlist={playlist} type={'playlist'} small={true} />
      </div>
    </div>
  )
}

export default PlaylistCard
