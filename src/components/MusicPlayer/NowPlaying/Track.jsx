import { Link } from "react-router-dom"

import { BsDot, BsThreeDots } from "react-icons/bs"
import { MdFavoriteBorder } from "react-icons/md"
import { FavoriteButton } from "../../Buttons"
import { Options } from "../../Options"

const Track = ({ activeSong, currentSongs, handleClick, duration, appTime, setSeekTime, imgRef, handleLoad, colors }) => {
  return (
    <>
      <img crossOrigin="anonymous" ref={imgRef} onLoad={handleLoad} src={activeSong?.album?.cover_big} className="aspect-square rounded-sm shadow-lg shadow-black/20 max-h-[350px] lg:row-span-5" />
      <div className="flex items-center justify-between gap-3 lg:col-span-4 lg:row-span-2">
        <div className="flex-1 flex flex-col justify-center items-start gap-2" onClick={handleClick}>
          <Link to={`/songs/${activeSong?.id}`}>
            <p className="text-white text-lg font-bold">
              {activeSong?.title?.length > 50 && window.innerWidth < 800 ? activeSong?.title?.substring(0, 47) + '...' : activeSong?.title}
            </p>
          </Link>
          <div className="flex flex-wrap flex-row items-center text-gray-200 text-sm font-semibold">
            <Link to={`/artists/${activeSong?.artist?.id}`}><p className="truncate">{activeSong?.artist?.name}</p></Link>
            <BsDot size={20} />
            <Link to={`/albums/${activeSong?.album?.id}`}><p className="truncate">{activeSong?.album?.title}</p></Link>
          </div>
        </div>
        <FavoriteButton small={true} data={activeSong} type="track" />
        <Options
          type="track"
          small={true}
          song={activeSong}
          artist={activeSong?.artist}
          album={activeSong?.album}
          favorite={activeSong?.favorite}
          blacklist={activeSong?.blacklist}
          i={currentSongs?.findIndex( song => song?.id === activeSong?.id )}
          tracks={currentSongs}
        />
      </div>
      <div className="flex flex-col text-gray-200 text-xs lg:text-sm font-semi gap-2 col-span-4">
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
