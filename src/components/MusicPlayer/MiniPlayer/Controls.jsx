import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';

const Controls = ({ dispatch, isPlaying, currentSongs, currentIndex, play, pause, prev, next }) => (
  <div className="flex items-center justify-end lg:justify-around w-full">
    <MdSkipPrevious size={25} color={`${currentSongs?.length ? '#fff' : '#555'}`} className={"cursor-pointer hidden md:block"} onClick={() => currentSongs?.length && prev(dispatch, currentIndex - 1)} />
    {
    isPlaying ? 
      (
        <BsFillPauseFill size={35} color="#FFF" onClick={() => pause(dispatch)} className="cursor-pointer transition-transform active:scale-90" />
      ) : 
      (
        <BsFillPlayFill size={35} color="#FFF" onClick={() => play(dispatch)} className="cursor-pointer transition-transform active:scale-90" />
      )
    }
    <MdSkipNext size={25} color={`${currentSongs?.length ? '#fff' : '#555'}`} className="cursor-pointer hidden md:block" onClick={() => currentSongs?.length && next(dispatch, currentIndex + 1)} />
  </div>
);

export default Controls;
