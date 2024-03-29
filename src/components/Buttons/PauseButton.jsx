import { BsPauseFill } from 'react-icons/bs'
import { pause } from '../../utils/player'

const PauseButton = ({ text, bg }) => {
    return (
        <button
            style={{ backgroundColor: bg, color: text }}
            onClick={pause}
            className="md:h-[50px] h-[40px] truncate px-4 rounded-md border border-[#91D8F7] bg-[#91d8f7] text-black shadow shadow-black/50 font-semibold relative flex flex-row justify-center items-center gap-1 opacity-90 transition-[transform] active:scale-90 hover:opacity-100 text-xs md:text-sm lg:text-base"
        >
            <BsPauseFill size={25} />
            <span>Pause</span>
        </button>
    )
}

export default PauseButton
