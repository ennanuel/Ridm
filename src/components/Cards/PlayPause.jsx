import { FaPause, FaPlay } from 'react-icons/fa'

const PlayPause = ({ handlePause, handlePlay, isCurrent, isPlaying, size, cover }) => (
  isPlaying && isCurrent ?
    <div className={`play_pause ${cover && 'p-[20px] pl-[22px] bg-[#91D8F7] shadow'} pause_play_icon flex justify-center items-center rounded-[15px] transition-transform hover:scale-110 shadow-lg shadow-black/50`}>
      <FaPause
        size={size || 15}
        className={`${cover ? "text-black" : "text-[#91D8F7]"}`}
        onClick={handlePause}
      />
    </div> :
    <div className={`play_pause ${cover && `h-[50px] w-[50px] bg-black border pl-[2px] border-white/5`} pause_play_icon flex justify-center items-center rounded-full transition-transform hover:scale-110`}>
      <FaPlay
        size={size || 15}
        className={`${cover ? "text-white" : "text-[#91D8F7]"}`}
        onClick={handlePlay}
      />
    </div>
);

export default PlayPause;
