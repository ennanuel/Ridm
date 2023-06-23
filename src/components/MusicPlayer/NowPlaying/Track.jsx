import { Link } from "react-router-dom"

import { BsDot } from "react-icons/bs"

const Track = ({ activeSong, handleClick, duration, appTime, setSeekTime }) => {
  return (
    <>
    <img src={activeSong?.album?.cover_big} className="md:w-[70%] lg:w-[50%] w-[90%] max-w-[300px] lg:max-w-auto aspect-square rounded-lg bg-white/10 shadow-lg shadow-black/50" />
    <div className="w-[90%] max-w-[300px] lg:max-w-auto md:w-[70%] lg:w-[50%] flex flex-col gap-1" onClick={handleClick}>
        <Link to={`/songs/${activeSong?.id}`}><p className="w-[70%] text-gray-200 text-lg font-bold truncate">{activeSong?.title}</p></Link>
        <div className="flex flex-wrap flex-row items-center text-gray-400 text-sm font-semibold">
            <Link to={`/artists/${activeSong?.artist?.id}`}><p className="truncate">{activeSong?.artist?.name}</p></Link>
            <BsDot size={20} />
            <Link to={`/albums/${activeSong?.album?.id}`}><p className="truncate">{activeSong?.album?.title}</p></Link>
        </div>
    </div>
    <div className="md:w-[70%] max-w-[300px] lg:max-w-auto lg:w-[50%] w-[90%] flex flex-col gap-3">
        <div className="flex items-center text-gray-400 text-sm font-semi gap-4">
            <p>{duration ? `${Math.floor(appTime/60)}:${`0${Math.floor(appTime % 60)}`.slice(-2)}` : '0:00'}</p>
            <input type="range" step="any" value={appTime} min='0' max={duration} className="seek_slider flex-1" onInput={e => setSeekTime(e.target.value)} />
            <p>{`${Math.floor(duration/60)}:${`0${Math.floor(duration % 60)}`.slice(-2)}`}</p>
        </div>
    </div>
    </>
  )
}

export default Track
