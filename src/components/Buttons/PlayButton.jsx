import { BsPlayFill } from 'react-icons/bs';
import { offShuffle, playSongs } from '../../utils/player';

const PlayButton = ({ song, i, tracks, album, bg, text }) => {
  const handlePlay = () => {
    playSongs({ song, tracks, i: i || 0, album });
    offShuffle();
  }

  return (
    <button
      style={{
        backgroundColor: bg,
        color: text,
        boxShadow: text ? `0 0 2px 0 ${text.replace(')', ',.6)')}` : '0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 12px rgba(0, 0, 0, 0.05)'
      }}
      onClick={handlePlay}
      className="md:h-[50px] text-xs md:text-sm lg:text-base h-[40px] md:min-w-[120px] truncate px-4 rounded-[15px] bg-[rgb(145,216,247,1)] text-[#000] shadow-lg shadow-black/50 font-semibold relative flex flex-row justify-center items-center gap-1 opacity-90 transition-[transform] active:scale-90 hover:opacity-100"
    >
      <span><BsPlayFill size={25} /></span>
      <span>Play</span>
    </button>
  )
};

export default PlayButton
