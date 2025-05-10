import { BsChatRightQuote } from "react-icons/bs"
import { MdQueueMusic } from "react-icons/md"

const ChangeQueueLyrics = ({ setLyricsQueue, lyricsQueue }) => {

    const handleClick = (val) => {
        setLyricsQueue(val);
        location.href = '#queue_lyrics'
    }

    return (
        <div className="mt-16 min-h-20 flex lg:hidden flex-row justify-end items-center gap-2 text-black mx-3">
            <button onClick={() => handleClick(false)} className={`px-3 flex items-center justify-center gap-1 h-8 rounded-md ${!lyricsQueue ? 'bg-white text-black ' : 'bg-white/5 text-gray-300'} text-sm`}>
                <BsChatRightQuote size={16} /> 
                <span className={`transition-[max-width] block overflow-clip ${lyricsQueue ? 'max-w-0 -mr-1' : 'max-w-[120px]'}`}>Lyrics</span>
            </button>
            <button onClick={() => handleClick(true)} className={`px-3 flex items-center justify-center gap-1 h-8 rounded-md ${lyricsQueue ? 'bg-white text-black ' : 'bg-white/5 text-gray-300 border border-transparent md:border-gray-300/20'} text-sm`}>
                <MdQueueMusic size={16} /> 
                <span className={`transition-[max-width] block overflow-clip ${!lyricsQueue ? 'max-w-0 -mr-1' : 'max-w-[120px]'}`}>Queue</span>
            </button>
        </div>
    )
}

export default ChangeQueueLyrics
