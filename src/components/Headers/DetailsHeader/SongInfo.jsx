import { BsDot } from "react-icons/bs"
import { MdExplicit } from "react-icons/md"

const SongInfo = ({ data }) => {
  return (
    <>
    {
        data?.type != 'album' ?
        <span>
          {
            Math.floor(data.duration / 60) ?
            Math.floor(data.duration / 60) + (Math.floor(data.duration / 60) > 1 ? ' mins ' : ' min ') :
            ''
          }
          {
            data.duration % 60 ?
            data.duration % 60 + (data.duration % 60 > 1 ? ' secs' : ' sec') :
            ''
          }
        </span> :
         <span>1M streams</span>
    }
    {
        (data?.explicit_lyrics || data?.explicit_lyrics) &&
        <span className="text-gray-400 flex flex-row items-center justify-center"><BsDot size={20} /><MdExplicit size={20} /></span>
    }
    </>
  )
}

export default SongInfo
