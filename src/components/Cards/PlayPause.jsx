import { FaPause, FaPlay } from 'react-icons/fa'
import { IoIosPlay } from 'react-icons/io';

const PlayPause = ({ handlePause, handlePlay, isCurrent, isPlaying, size, cover }) => (
  isPlaying && isCurrent ?
    <div className={`play_pause ${cover && 'p-[20px] pl-[22px] bg-[#91D8F7] shadow'} pause_play_icon flex justify-center items-center rounded-[15px] transition-transform hover:scale-110 shadow-lg shadow-black/50`}>
      <IoIosPlay
        size={size || 16}
        className={`${cover ? "text-black" : "text-white"}`}
        onClick={handlePause}
      />
    </div> :
    <div className={`play_pause ${cover && `h-[50px] w-[50px] bg-black border pl-[2px] border-white/5`} pause_play_icon flex justify-center items-center rounded-full transition-transform hover:scale-110`}>
      <IoIosPlay
        size={size || 16}
        className={`${cover ? "text-white" : "text-white"}`}
        onClick={handlePlay}
      />
    </div>
);

export default PlayPause;
