import React from 'react'

const PlaylistSongs = ({ tracks, setNewPlaylist }) => {
  return (
    <div className="animate-popin flex-1 flex flex-col gap-6 rounded-[20px] mt-4 max-h-[85vh]">
      <h2 className="text-gray-200 font-bold p-1">Playlist Songs ({tracks.length})</h2>
      <ul className="h-[300px] flex flex-1 flex-col overflow-y-scroll overflow-x-clip border border-white/5 rounded-[15px] bg-black/50">
        {
          tracks.map( (song, i) => 
            <li key={i} className="relative flex flex-row gap-2 items-center p-2  transition-transform lg:hover:translate-x-[-5px] hover:translate-x-[-100px] hover:bg-white/5 hover:border-transparent border-b border-white/5 last:border-transparent">
              <img src={song.album.cover_small} className="min-w-[50px] aspect-square rounded-md bg-white/50" />
              <div className="flex flex-col">
                <p className="text-white text-sm truncate">{song.title}</p>
                <p className="text-gray-400 text-xs">{song.artist.name}</p>
              </div>
              <button type="button" onClick={() => setNewPlaylist({type: 'REMOVESONG', payload: song})} className="absolute left-[100%] top-0 h-full w-[100px] transition-transform hover:lg:translate-x-[-95px] bg-red-600 text-white text-sm">Remove</button>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default PlaylistSongs
