import { MdRepeat, MdShuffle } from 'react-icons/md'
import { BsPlayFill, BsPauseFill, BsSkipEndFill, BsSkipStartFill } from 'react-icons/bs'

const Controls = ({ dispatch, isPlaying , repeat, prev, next, pause, play, onRepeat, offRepeat, onShuffle, offShuffle, shuffle, currentIndex }) => {
  return (
    <div className="flex flex-row items-center justify-center gap-4">
        <button className={`text-gray-400 relative ${repeat ? 'text-white' : 'text-gray-400'}`} onClick={() => repeat ? onRepeat(dispatch) : offRepeat(dispatch)}>
            <MdRepeat size={25} />
            {
                repeat &&
                <span className="absolute left-[50%] bottom-[-10px] translate-x-[-50%] h-[5px] aspect-square rounded-full bg-white shadow-xl shadow-white/50"></span>
            }
        </button>

        <button className="text-gray-200 transition-transform active:scale-90" onClick={() => prev(dispatch, currentIndex - 1)}><BsSkipStartFill size={35} /></button>

        <button onClick={() => isPlaying ? pause(dispatch) : play(dispatch)} className="flex items-center justify-center bg-white text-black p-3 rounded-lg transition-transform active:scale-90">
            {
                isPlaying ?
                <BsPauseFill size={30} /> :
                <BsPlayFill size={30} />
            }
        </button>

        <button className="text-gray-200 transition-transform active:scale-90" onClick={() => next(dispatch, currentIndex + 1)}><BsSkipEndFill size={35} /></button>

        <button className={`text-gray-400 relative ${shuffle ? 'text-white' : 'text-gray-400'}`} onClick={() => shuffle ? offShuffle(dispatch) : onShuffle(dispatch, true)}>
            <MdShuffle size={25} />
            {
                shuffle &&
                <span className="absolute left-[50%] bottom-[-10px] translate-x-[-50%] h-[5px] aspect-square rounded-full bg-white shadow-xl shadow-white/50"></span>
            }
        </button>
    </div>
  )
}

export default Controls
