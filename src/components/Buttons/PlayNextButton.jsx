import { playNext } from '../../utils/player';
import { MdPlaylistAdd } from 'react-icons/md';

const PlayNextButton = ({ tracks, album, bg, text }) => {
  const addToQueue = () => {
    playNext({ tracks, album });
  }

  return (
    <button
      style={{
        backgroundColor: bg,
        color: text,
        borderColor: text?.replace(')', ',0.2)')
      }}
      onClick={addToQueue}
      className="lg:px-5 lg:h-[50px] truncate rounded-md w-fit border border-[rgba(145,216,247,0.2)] text-[#91D8F7] font-semibold gap-2 flex flex-row items-center justify-center relative bg-[#101010] px-3 h-[40px] text-xs md:text-sm lg:text-base">
        <MdPlaylistAdd size={25} />
        Play next
    </button>
  )
}

export default PlayNextButton
