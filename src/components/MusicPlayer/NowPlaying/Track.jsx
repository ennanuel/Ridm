import { Link } from "react-router-dom"

import { BsDot, BsThreeDots } from "react-icons/bs"
import { MdFavoriteBorder } from "react-icons/md"

const Track = ({ activeSong, handleClick, duration, appTime, setSeekTime, imgRef, handleLoad, colors }) => {
  return (
    <>
      <img crossOrigin="anonymous" ref={imgRef} onLoad={handleLoad} src={activeSong?.album?.cover_big} className="aspect-square rounded-sm shadow-lg shadow-black/20 max-h-[350px] lg:row-span-4" />
      <div className="flex items-center justify-between gap-3 lg:col-span-4">
        <div className="flex-1 flex flex-col justify-center items-start gap-2" onClick={handleClick}>
            <Link to={`/songs/${activeSong?.id}`}><p className="w-[70%] text-white text-lg font-bold truncate">{activeSong?.title}</p></Link>
            <div className="flex flex-wrap flex-row items-center text-gray-200 text-sm font-semibold">
                <Link to={`/artists/${activeSong?.artist?.id}`}><p className="truncate">{activeSong?.artist?.name}</p></Link>
                <BsDot size={20} />
                <Link to={`/albums/${activeSong?.album?.id}`}><p className="truncate">{activeSong?.album?.title}</p></Link>
            </div>
        </div>
        <button className="text-white flex items-center justify-center"><MdFavoriteBorder size={40} /></button>
        <button className="text-white flex items-center justify-center"><BsThreeDots size={30} /></button>
      </div>
    <div className="flex flex-col text-gray-400 text-sm font-semi gap-2">
        <input type="range" step="any" value={appTime} min='0' max={duration} className="seek_slider flex-1 shadow shadow-black/40" onInput={e => setSeekTime(e.target.value)} />
        <div className="flex items-center justify-between">
              
          <p>{duration ? `${Math.floor(appTime/60)}:${`0${Math.floor(appTime % 60)}`.slice(-2)}` : '0:00'}</p>
          <p>{`${Math.floor(duration/60)}:${`0${Math.floor(duration % 60)}`.slice(-2)}`}</p>
        </div>
    </div>
    </>
  )
}

export default Track
