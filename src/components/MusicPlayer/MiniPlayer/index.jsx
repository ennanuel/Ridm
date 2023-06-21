import Track from './Track'
import Controls from './Controls'
import ExpandCollapse from '../ExpandCollapse'

const MiniPlayer = ({ dispatch, duration, seekTime, appTime, scrolled, isPlaying, currentSongs, activeSong, isActive, currentIndex, nowPlaying, handleClick, next, prev, play, pause }) => {
  const style = {backgroundColor: (scrolled ? 'transparent' : 'var(--color)')}

  return (
    <div style={style} className={`${nowPlaying && 'translate-y-[100%] lg:translate-y-0 opacity-0'} relative top-5 lg:top-0 q-full lg:w-fit md:min-w-[300px] animate-slideup lg:animate-popin music_player transition-[transform,opacity] rounded-tr-xl rounded-tl-xl lg:rounded-md ${scrolled ? 'scale-100' : 'pb-4 lg:pb-0 lg:mt-1 lg:scale-90 backdrop-blur-md'}`}>
      <div className="absolute z-[1] w-full h-full lg:hidden lg:pointer-events-none" onClick={window.innerWidth < 1024 && handleClick} />
      <div className="absolute z-[0] lg:hidden bg-gray-600 w-full h-[2px] bottom-5 left-0">
        <div style={{width: Math.round((appTime/duration) * 100) + '%'}} className="w-[0] h-full bg-white"></div>
      </div>
      <div className="gap-5 flex items-center justify-end rounded-md py-[15px] px-[20px]">
        <Track isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        <div className="relative flex-1 z-[2] flex flex-col items-center justify-center relative z-[1]">
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
