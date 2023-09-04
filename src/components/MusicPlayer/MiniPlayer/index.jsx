import Track from './Track'
import Controls from './Controls'
import ExpandCollapse from '../ExpandCollapse'
import ColorThief from 'colorthief'
import { useRef, useMemo, useState } from 'react'

const MiniPlayer = ({ dispatch, duration, appTime, scrolled, isPlaying, currentSongs, activeSong, isActive, currentIndex, nowPlaying, handleClick, next, prev, play, pause }) => {
  const [[bg, text], setColors] = useState(['', '', ''])
  const style = useMemo(() => ({ backgroundColor: !scrolled && (bg || 'black') }), [bg, scrolled])
  const imageRef = useRef();

  const onLoad = () => {
    const colorThief = new ColorThief();
    const colors = colorThief.getPalette(imageRef.current, [, 3]).slice(0, 2)
    if (colors.length != 2) return;
    setColors(colors.map( ([r, g, b], i) => `rgba(${r}, ${g}, ${b}, ${i === 0 ? '0.5' : '1'})` ))
  }

  return (
    <div style={style} className={`${nowPlaying && 'translate-y-[100%] lg:translate-y-0 opacity-0'} relative w-[calc(100%-20px)] m-auto lg:m-0 lg:p-0 lg:px-3 lg:py-2 lg:h-full lg:w-fit md:min-w-[300px] animate-slideup lg:animate-popin music_player transition-[transform,opacity] rounded-lg overflow-hidden lg:rounded-none lg:rounded-bl-xl backdrop-blur-lg ${!scrolled && 'shadow shadow-black/50'}`}>
      <button className="absolute z-[1] w-full h-full lg:hidden lg:pointer-events-none" onClick={window.innerWidth < 1024 && handleClick} />
      <div style={{width: Math.round((appTime/duration) * 100) + '%'}} className="absolute top-0 left-0 lg:hidden bg-white/10 h-full">
      </div>
      <div className="relative z-1 gap-5 flex items-center justify-end rounded-md p-3">
        <Track scrolled={scrolled} imageRef={imageRef} text={text} onLoad={onLoad}  isPlaying={isPlaying} isActive={isActive} activeSong={activeSong} />
        <div className="relative z-[1] flex flex-col items-center justify-center">
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
