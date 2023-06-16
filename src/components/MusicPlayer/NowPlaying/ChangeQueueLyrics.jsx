import { BsChatRightQuote } from "react-icons/bs"
import { MdQueueMusic } from "react-icons/md"

const ChangeQueueLyrics = ({ setLyricsQueue, lyricsQueue }) => {
  return (
    <div className="flex flex-row gap-4 text-black">
        <button onClick={() => setLyricsQueue(false)} className={`flex items-center justify-center gap-1 font-bold p-2 rounded-md shadow-lg shadow-black/50 ${lyricsQueue ? 'bg-white/10 text-white' : 'bg-gray-200 text-black'}`}>
            <BsChatRightQuote size={20} /> 
            {
                !lyricsQueue && <span>Lyrics</span>
            }
        </button>
        <button onClick={() => setLyricsQueue(true)} className={`flex items-center justify-center gap-1 font-bold p-2 rounded-md shadow-lg shadow-black/50 ${!lyricsQueue ? 'bg-white/10 text-white' : 'bg-gray-200 text-black'}`}>
            <MdQueueMusic size={20} /> 
            {
                lyricsQueue && <span>Queue</span>
            }
        </button>
    </div>
  )
}

export default ChangeQueueLyrics
