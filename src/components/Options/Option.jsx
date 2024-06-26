import React from 'react'

const Option = ({ option, handleOption, song, artist, album, genre, playlist, radio, tracks, i }) => {
  return (
    <button 
      onClick={() => handleOption(option.action, {song, artist, album, genre, playlist, radio, tracks, i})}
      className="relative z-[2] px-4 pr-6 h-[36px] md:h-[40px] flex items-center hover:bg-white/10 cursor-pointer text-left"
    >
        {option.name}
    </button>
  )
}

export default Option
