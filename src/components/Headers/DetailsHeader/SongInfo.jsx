import { BsDot } from "react-icons/bs"
import { MdExplicit } from "react-icons/md"

const SongInfo = ({ data }) => {
  return (
    <>
      {
        data?.type == 'artist' &&
          <span>
            {
              data?.fans / 1000000 > 1 ? `${(data?.fans/1000000).toFixed(1)} M` :
                data?.fans / 1000 > 1 ? `${(data?.fans / 1000).toFixed(1)}K` :
                  data?.fans
            } fans
          </span>
      }
      {
        (data?.type != 'artist') &&
        <span className="text-gray-400 flex flex-row items-center justify-center"><BsDot size={20} /><MdExplicit size={20} /></span>
      }
    </>
  )
}

export default SongInfo
