import React from 'react'

const Option = ({ option, handleOption, song, artist, album, genre, playlist, radio, tracks, i }) => {
  return (
    <button 
      onClick={() => handleOption(option.action, {song, artist, album, genre, playlist, radio, tracks, i})}
      className="relative z-[2] px-4 pr-8 h-9 md:h-10 flex items-center hover:bg-white/10 cursor-pointer text-left border-b border-white/5 last:border-transparent"
    >
        {option.name}
    </button>
  )
}

export default Option
