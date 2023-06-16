import { BsDot } from "react-icons/bs"
import { MdExplicit } from "react-icons/md"

const SongInfo = ({ songData, albumData }) => {
  return (
    <>
    {
        songData ?
        <span>
          {
            Math.floor(songData.duration / 60) ?
            Math.floor(songData.duration / 60) + (Math.floor(songData.duration / 60) > 1 ? ' mins ' : ' min ') :
            ''
          }
          {
            songData.duration % 60 ?
            songData.duration % 60 + (songData.duration % 60 > 1 ? ' secs' : ' sec') :
            ''
          }
        </span> :
         <span>1M streams</span>
    }
    {
        (songData?.explicit_lyrics || albumData?.explicit_lyrics) &&
        <span className="text-gray-400 flex flex-row items-center justify-center"><BsDot size={20} /><MdExplicit size={20} /></span>
    }
    </>
  )
}

export default SongInfo
