import { MdRepeat, MdShuffle } from 'react-icons/md'
import { BsPlayFill, BsPauseFill, BsSkipEndFill, BsSkipStartFill } from 'react-icons/bs'

const Controls = ({ dispatch, isPlaying , repeat, prev, next, pause, play, onRepeat, offRepeat, onShuffle, offShuffle, shuffle, currentIndex }) => {
  return (
    <div className="flex flex-1 flex-row items-center justify-between mx-4 lg:mx-0 gap-4 lg:col-span-3 lg:row-span-2">
        <button className={`relative text-white rounded-full h-[40px] aspect-square flex items-center justify-center transition-[background-color,transform] active:scale-90 ${repeat && 'bg-white/10 border border-white/50'}`} onClick={() => repeat ? onRepeat(dispatch) : offRepeat(dispatch)}>
            <MdRepeat size={25} />
        </button>
          
        <div className="flex items-center justify-center gap-4">
            <button className="text-gray-200 transition-transform active:scale-90" onClick={() => prev(dispatch, currentIndex - 1)}><BsSkipStartFill size={30} /></button>

            <button onClick={() => isPlaying ? pause(dispatch) : play(dispatch)} className="play_btn flex items-center justify-center bg-white text-black w-[60px] aspect-square rounded-full transition-transform active:scale-90">
                {
                    isPlaying ?
                    <BsPauseFill size={30} /> :
                    <BsPlayFill size={30} />
                }
            </button>

            <button className="text-gray-200 transition-transform active:scale-90" onClick={() => next(dispatch, currentIndex + 1)}><BsSkipEndFill size={30} /></button>
        </div>
        <button className={`relative text-white rounded-full h-[40px] aspect-square flex items-center justify-center transition-[background-color,transform] active:scale-90 ${shuffle && 'bg-white/10 border border-white/50'}`} onClick={() => shuffle ? offShuffle(dispatch) : onShuffle(dispatch, true)}>
            <MdShuffle size={25} />
        </button>
    </div>
  )
}

export default Controls
