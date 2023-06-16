import { FaPause, FaPlay } from 'react-icons/fa'

const PlayPause = ({ handlePause, handlePlay, isCurrent, isPlaying, size, cover, spacing }) => (
  isPlaying && isCurrent ? (
    <div className={`play_pause ${cover && 'p-[20px] pl-[22px] bg-[#91D8F7] shadow'} pause_play_icon flex flex-row justify-center items-center rounded-lg transition-transform hover:scale-110 shadow-lg shadow-black/50`}>
      <FaPause
        size={size || 15}
        className={`${cover ? "text-black" : "text-[#91D8F7]"}`}
        onClick={handlePause} 
      />
    </div>
  ) : (
    <div className={`play_pause ${cover && `p-[${spacing ? spacing + 'px' : '20px'}] pl-[${spacing ? (spacing + 2) + 'px' : '22px'}] bg-[#91D8F7] shadow`} pause_play_icon flex flex-row justify-center items-center rounded-lg transition-transform hover:scale-110 shadow-lg shadow-black/50`}>
      <FaPlay
        size={size || 15}
        className={`${cover ? "text-black" : "text-[#91D8F7]"}`}
        onClick={handlePlay}
      />
    </div>
  )
);

export default PlayPause;
