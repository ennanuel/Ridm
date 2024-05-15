import { Link } from "react-router-dom"

import { BsDot } from "react-icons/bs"
import { MdExplicit } from "react-icons/md"

const SongInfo = ({ song, artistId }) => {
  return (
    <div className="flex-1 flex flex-col justify-center mx-3">
      <Link to={`/songs/${song.id}`}>
        <p className="text-xs md:text-sm font-semibold text-white truncate max-w-[200px]">{song?.title}</p>
      </Link>
        <div className="flex flex-row flex-wrap gap-1 items-center text-gray-300">
          {
            artistId ?
            song.contributors.map( (contributor, i, contributors) => (
              <Link to={`/artists/${contributor.id}`}>
                <p className="text-[0.75em] font-semibold text-gray-200 flex flex-row items-center justify-start truncate">
                  {contributor.name}{i === contributors.length - 1 ? null : <BsDot size={15} />}
                </p>
              </Link>
            )) :
            <Link to={`/artists/${song.artist.id}`}>
              <p className="text-[0.75em] font-semibold text-gray-300 max-w-[200px] flex flex-row items-center justify-start gap-1 truncate">
                {song?.artist.name}
              </p>
            </Link>
          }
          {song?.explicit_lyrics && <MdExplicit size={20} />}
        </div>
      {
        song?.album?.title && 
        <p className="text-xs text-gray-500 font-semibold truncate max-w-[200px]">
          {song.album.title}
        </p>
      }
    </div>
  )
}

export default SongInfo
