import { Link } from "react-router-dom"
import { Options } from "../Options"

const PlaylistCard = ({ i, playlist }) => {
  return (
    <div style={{ animationDelay: i / 20 + 's', animationFillMode: 'forwards' }} className="animate-slideleft opacity-0 p-3 rounded-[15px] bg-white/5 hover:bg-white/10 flex flex-col gap-3">
      <Link to={`/playlists/${playlist.id}`}>
        <img src={playlist?.tracks[0]?.album.cover_medium} alt="" className="h-[150px] rounded-[10px] w-full bg-white/5 object-cover" />
      </Link>
      <div className="flex justify-between items-center gap-4">
        <Link to={`/playlists/${playlist.id}`} className="flex flex-col">
          <p className="font-bold text-lg text-white">{playlist.name}</p>
          <p className="text-xs text-gray-400">{playlist.tracks.length} {playlist.tracks.length === 1 ? 'track' : 'tracks'}</p>
        </Link>
        <Options tracks={playlist.tracks} song={playlist.tracks[0]} i={0} playlist={playlist} type={'playlist'} small={true} />
      </div>
    </div>
  )
}

export default PlaylistCard
