import { MdShuffle } from 'react-icons/md'
import { onShuffle, playSongs } from '../../utils/player'

const ShuffleButton = ({ album, tracks, bg, text }) => {
  const handleShuffle = () => {
    const i = Math.floor(Math.random() * tracks.length);
    const song = tracks[i];
    playSongs({ tracks, song, i, album });
    onShuffle();
  }

  return (
    <button
      style={{ backgroundColor: bg, color: text, boxShadow: text ? `0 0 2px 0 ${text.replace(')', ',.6)')}` : '0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 12px rgba(0, 0, 0, 0.05)' }}
      onClick={handleShuffle}
      className="h-[40px] md:h-[50px] rounded-[15px] px-4 bg-black truncate text-[#91D8F7] font-semibold relative flex flex-row justify-center items-center gap-2 opacity-90 hover:opacity-100 active:scale-90 text-xs md:text-sm lg:text-base">
      <span><MdShuffle size={25} /></span><span>Shuffle</span>
    </button>
  )
};

export default ShuffleButton
