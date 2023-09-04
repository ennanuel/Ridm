import { useDispatch } from 'react-redux'

import { BsPlayFill } from 'react-icons/bs'

import { offShuffle, playSongs } from '../../functions/player'

const PlayButton = ({ song, i, tracks, album}) => {
    const dispatch = useDispatch()

    const handlePlay = () => {
      playSongs({ dispatch, song, tracks, i: i || 0, album});
      offShuffle(dispatch)
    }

    return (
        <button onClick={handlePlay} className="md:h-[50px] h-[40px] md:min-w-[120px] truncate px-4 rounded-md border border-[#91D8F7] bg-[#91D8F7] text-[#000] shadow shadow-black/50 font-semibold relative flex flex-row justify-center items-center gap-1 opacity-90 transition-[transform] active:scale-90 hover:opacity-100">
        <span><BsPlayFill size={25} /></span>Play
        </button>
    )
}

export default PlayButton
