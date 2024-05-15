import { BsPauseFill } from 'react-icons/bs'
import { pause } from '../../utils/player'

const PauseButton = ({ text, bg }) => {
    return (
        <button
            style={{
                backgroundColor: bg,
                color: text,
                boxShadow: text ? `0 0 2px 0 ${text.replace(')', ',.6)')}` : '0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 12px rgba(0, 0, 0, 0.05)'
            }}
            onClick={pause}
            className="md:h-[50px] h-[40px] truncate px-4 rounded-[15px] bg-[#91d8f7] text-black shadow shadow-black/50 font-semibold relative flex flex-row justify-center items-center gap-1 opacity-90 transition-[transform] active:scale-90 hover:opacity-100 text-xs md:text-sm lg:text-base"
        >
            <BsPauseFill size={25} />
            <span>Pause</span>
        </button>
    )
}

export default PauseButton
