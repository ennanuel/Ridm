import { BsChatRightQuote } from "react-icons/bs"
import { MdQueueMusic } from "react-icons/md"

const ChangeQueueLyrics = ({ setLyricsQueue, lyricsQueue }) => {

    const handleClick = (val) => {
        setLyricsQueue(val);
        location.href = '#queue_lyrics'
    }

    return (
        <div className="flex lg:hidden flex-row justify-end gap-2 text-black mx-3">
            <button onClick={() => handleClick(false)} className={`px-3 flex items-center justify-center gap-1 h-[30px] rounded-[5px] ${!lyricsQueue ? 'bg-gray-200 text-black ' : 'bg-black/80 text-gray-300'} text-sm`}>
                <BsChatRightQuote size={16} /> 
                <span className={`transition-[max-width] block overflow-clip ${lyricsQueue ? 'max-w-0 mr-[-4px]' : 'max-w-[120px]'}`}>Lyrics</span>
            </button>
            <button onClick={() => handleClick(true)} className={`px-3 flex items-center justify-center gap-1 h-[30px] rounded-[5px] ${lyricsQueue ? 'bg-gray-200 text-black ' : 'bg-black/80 text-gray-300 border border-gray-300/20'} text-sm`}>
                <MdQueueMusic size={16} /> 
                <span className={`transition-[max-width] block overflow-clip ${!lyricsQueue ? 'max-w-0 mr-[-4px]' : 'max-w-[120px]'}`}>Queue</span>
            </button>
        </div>
    )
}

export default ChangeQueueLyrics
