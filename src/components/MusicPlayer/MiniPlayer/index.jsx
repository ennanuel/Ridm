import Track from './Track'
import Controls from './Controls'
import ExpandCollapse from '../ExpandCollapse'

const MiniPlayer = ({ dispatch, duration, appTime, scrolled, isPlaying, currentSongs, activeSong, isActive, currentIndex, nowPlaying, handleClick, next, prev, play, pause }) => {
  const style = {backgroundColor: (scrolled ? 'transparent' : 'var(--color)')}

  return (
    <div style={style} className={`${nowPlaying && 'translate-y-[100%] lg:translate-y-0 opacity-0'} relative w-full mb-[-15px] pb-4 lg:m-0 lg:p-0 lg:w-fit md:min-w-[300px] animate-slideup lg:animate-popin music_player transition-[transform,opacity] rounded-tr-xl rounded-tl-xl lg:rounded-none`}>
      <div className="absolute z-[1] w-full h-full lg:hidden lg:pointer-events-none" onClick={window.innerWidth < 1024 && handleClick} />
      <div className="absolute z-[0] lg:hidden bg-gray-600 w-full h-[2px] bottom-5 left-0">
        <div style={{width: Math.round((appTime/duration) * 100) + '%'}} className="w-[0] h-full bg-white"></div>
      </div>
      <div className="gap-5 flex items-center justify-end rounded-md py-[15px] px-[20px]">
        <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        <div className="relative flex-1 z-[1] flex flex-col items-center justify-center">
          <Controls 
            isPlaying={isPlaying} 
            currentSongs={currentSongs}
            dispatch={dispatch}
            currentIndex={currentIndex}
            play={play}
            pause={pause}
            prev={prev} 
            next={next}
          />
        </div>
        <div className="lg:flex hidden">
          <ExpandCollapse onClick={handleClick} nowPlaying={nowPlaying} />
        </div>
      </div>
    </div>   
  )
}

export default MiniPlayer
