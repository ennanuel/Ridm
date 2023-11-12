import { MdRepeat, MdShuffle } from 'react-icons/md'
import { BsPlayFill, BsPauseFill, BsSkipEndFill, BsSkipStartFill } from 'react-icons/bs'
import { next, offRepeat, offShuffle, onRepeat, onShuffle, pause, play, prev } from '../../../utils/player'

const Controls = ({ isPlaying , repeat, shuffle, currentIndex }) => {
  return (
    <div className="flex flex-1 flex-row items-center justify-between mx-4 lg:mx-0 gap-4 lg:col-span-3 lg:row-span-2">
        <button className={`relative text-white rounded-full h-[40px] aspect-square flex items-center justify-center transition-[background-color,transform] active:scale-90 ${repeat && 'bg-white/10 border border-white/30'}`} onClick={repeat ? onRepeat : offRepeat}>
            <MdRepeat size={25} />
        </button>
          
        <div className="flex items-center justify-center gap-4">
            <button className="text-gray-200 transition-transform active:scale-90" onClick={() => prev(currentIndex - 1)}><BsSkipStartFill size={30} /></button>

            <button onClick={isPlaying ? pause : play } className="play_btn pl-[2px] flex items-center justify-center bg-white text-black w-[60px] aspect-square rounded-full transition-transform active:scale-90">
                {
                    isPlaying ?
                    <BsPauseFill size={30} /> :
                    <BsPlayFill size={30} />
                }
            </button>

            <button className="text-gray-200 transition-transform active:scale-90" onClick={() => next(currentIndex + 1)}><BsSkipEndFill size={30} /></button>
        </div>
        <button className={`relative text-white rounded-full h-[40px] aspect-square flex items-center justify-center transition-[background-color,transform] active:scale-90 ${shuffle && 'bg-white/10 border border-white/30'}`} onClick={() => shuffle ? offShuffle() : onShuffle(true)}>
            <MdShuffle size={25} />
        </button>
    </div>
  )
}

export default Controls
