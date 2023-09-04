import React from 'react'

const Recommended = ({ suggestedSongs, setNewPlaylist, tracks }) => {
  return (
    <div className="animate-popin flex-1 flex flex-col gap-2 p-2 rounded-md bg-black/50 h-full">
      <h2 className="text-gray-200 font-bold p-1">Recommended Songs</h2>
      <ul className="h-[300px] flex flex-col overflow-y-scroll">
        {
          suggestedSongs?.map( (track, i) => 
          <li 
            key={i} 
            onClick={() => setNewPlaylist({payload: track, type: tracks.map(elem => elem.id).includes(track.id) ? 'REMOVESONG' : 'ADDSONG'})} 
            className={`flex flex-row gap-2 items-center p-2 hover:bg-white/5 ${tracks.map(elem => elem.id).includes(track.id) && 'bg-white/10'}`}
          >
              <img src={track.album.cover_small} className="min-w-[50px] aspect-square rounded-md" />
              <div className="flex flex-col">
                <p className="text-white text-sm truncate max-w-[350px]">{track.title}</p>
                <p className="text-gray-400 text-xs">{track.artist.name}</p>
              </div>
              <div className="flex-1 flex items-center justify-end">
                <input type="checkbox" checked={tracks.map(elem => elem.id).includes(track.id)} />
              </div>
            </li>
          )
        }
      </ul>
    </div>
  )
}

export default Recommended
