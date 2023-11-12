import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsFillPauseFill, BsFillPlayFill } from 'react-icons/bs';
import { next, pause, play, prev } from '../../../utils/player';

const Controls = ({ isPlaying, currentSongs, currentIndex }) => (
  <div className="flex items-center justify-end lg:justify-around w-full">
    <MdSkipPrevious size={25} color={`${currentSongs?.length ? '#fff' : '#555'}`} className={"cursor-pointer hidden md:block"} onClick={() => currentSongs?.length && prev(currentIndex - 1)} />
    {
    isPlaying ? 
      (
        <BsFillPauseFill size={35} color="#FFF" onClick={pause} className="cursor-pointer transition-transform active:scale-90" />
      ) : 
      (
        <BsFillPlayFill size={35} color="#FFF" onClick={play} className="cursor-pointer transition-transform active:scale-90" />
      )
    }
    <MdSkipNext size={25} color={`${currentSongs?.length ? '#fff' : '#555'}`} className="cursor-pointer hidden md:block" onClick={() => currentSongs?.length && next(currentIndex + 1)} />
  </div>
);

export default Controls;
