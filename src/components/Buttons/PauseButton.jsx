import { useDispatch } from 'react-redux'

import { BsPauseFill } from 'react-icons/bs'

import { pause } from '../../functions/player'

const PlayButton = ({ text, bg }) => {
    const dispatch = useDispatch()

    const handlePlay = () => {
        pause(dispatch)
    }

    return (
        <button style={{ backgroundColor: bg, color: text }} onClick={handlePlay} className="md:h-[50px] h-[40px] truncate px-4 rounded-md border border-[#91D8F7] bg-[#91d8f7] text-black shadow shadow-black/50 font-semibold relative flex flex-row justify-center items-center gap-1 opacity-90 transition-[transform] active:scale-90 hover:opacity-100 text-xs md:text-sm lg:text-md">
            <span><BsPauseFill size={25} /></span>Pause
        </button>
    )
}

export default PlayButton
