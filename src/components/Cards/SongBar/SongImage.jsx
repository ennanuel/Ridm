import PlayPause from "../PlayPause"

const SongImage = ({ song, activeSong, isPlaying, handlePlayClick, handlePauseClick }) => {
  return (
    <div className="h-[50px] aspect-square relative flex justify-center ml-2 items-center">
      <img className="h-full w-auto rounded-sm block shadow-lg shadow-black" src={song?.album?.cover_small} alt={song.title} />
      <div className={`play_overlay transition-opacity absolute w-full h-full flex items-center justify-center bg-black/70 ${activeSong?.id === song.id && 'current-song'}`}>
        <PlayPause 
          isPlaying={isPlaying} 
          activeSong={activeSong} 
          isCurrent={activeSong?.id === song.id}
          handlePause={handlePauseClick}
          handlePlay={handlePlayClick} 
          size={20} 
        />
      </div>
    </div>
  )
}

export default SongImage
