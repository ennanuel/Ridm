import { BsChatRightQuote } from "react-icons/bs"
import { MdQueueMusic } from "react-icons/md"

const ChangeQueueLyrics = ({ setLyricsQueue }) => {
    return (
        <div className="flex flex-row justify-end gap-2 text-black mx-3">
            <button onClick={() => setLyricsQueue(false)} className="px-3 flex items-center justify-center gap-1 h-[30px] rounded-[15px] bg-gray-200 text-black text-sm">
                <BsChatRightQuote size={16} /> 
                <span>Lyrics</span>
            </button>
            <button onClick={() => setLyricsQueue(true)} className="px-3 flex items-center justify-center gap-1 h-[30px] rounded-[15px] bg-gray-200 text-black text-sm">
                <MdQueueMusic size={16} /> 
                <span>Queue</span>
            </button>
        </div>
    )
}

export default ChangeQueueLyrics
