import { BsDot, BsThreeDots } from 'react-icons/bs'
import { BiGridHorizontal } from 'react-icons/bi'

const QueueSong = ({song, currentSong, handleDragOver, handleDragEnd, color, i}) => {
  return (
    <div style={{ backgroundColor: currentSong && color.replace(')', ', 0.5)') }} draggable={true} i={i} onDragStart={e => e.target.style.opacity = '0.5'} onDragOver={handleDragOver} onDragEnd={handleDragEnd} className={`queue_song rounded-md flex p-2 flex-row items-center justify-center gap-2 text-gray-400 hover:bg-white/10 ${currentSong && 'bg-white/5'}`}>
        <BiGridHorizontal size={25} />
        <img src={song?.album?.cover_small} className="rounded-md h-[50px] w-[50px] bg-white/10" />
        <div className="flex flex-1 flex-col w-full">
            <p className="text-gray-200 text-sm max-w-[300px] font-semibold truncate">{song?.title}</p>
            <p className="flex flex-row flex-wrap items-center text-xs text-gray-400">
                <span className="block truncate">{song?.artist?.name}</span>
                <BsDot size={15} />
                <span className="block truncate">{song?.album?.title}</span>
            </p>
        </div>
    </div>
  )
}

export default QueueSong
