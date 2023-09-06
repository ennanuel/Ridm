import { useDispatch } from 'react-redux'

import { BsPlayFill } from 'react-icons/bs'

import { offShuffle, playSongs } from '../../functions/player'

const PlayButton = ({ song, i, tracks, album, bg, text }) => {
    const dispatch = useDispatch()

    const handlePlay = () => {
      playSongs({ dispatch, song, tracks, i: i || 0, album});
      offShuffle(dispatch)
    }

    return (
        <button style={{ backgroundColor: bg, color: text }} onClick={handlePlay} className="md:h-[50px] text-xs md:text-sm lg:text-md h-[40px] md:min-w-[120px] truncate px-4 rounded-md border border-[rgb(145,216,247,0)] bg-[rgba(145,216,247,1)] text-[#000] shadow shadow-black/50 font-semibold relative flex flex-row justify-center items-center gap-1 opacity-90 transition-[transform] active:scale-90 hover:opacity-100">
        <span><BsPlayFill size={25} /></span><span>Play</span>
        </button>
    )
}

export default PlayButton
