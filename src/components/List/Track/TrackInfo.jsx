import { MdExplicit } from "react-icons/md"
import { AiFillHeart } from "react-icons/ai"

const TrackInfo = ({ song }) => {
  return (
    <>
    <td className="text-white text-sm font-semibold">
        <span>{ song.title }</span>
        { song.explicit_lyrics && <span className="text-gray-300 inline-block ml-2 mb-[-5px]"><MdExplicit size={20} /></span> }
    </td>
    <td className="text-gray-500 text-sm">
          {Math.floor( song.duration/60 )}:{song.duration % 60 < 10 ? '0' + song.duration % 60 : song.duration % 60}
    </td>
    <td className="text-gray-200">
        {
         song.favorite && <AiFillHeart size={20} />
        }
    </td>
    </>
  )
}

export default TrackInfo
