import { BsDot } from "react-icons/bs"
import { MdExplicit } from "react-icons/md"

const SongInfo = ({ data }) => {

  return (
    <>
      {
        data?.type == 'artist' &&
        <span>
            {
              data?.nb_fan / 1000000 > 1 ? `${(data?.nb_fan /1000000).toFixed(1)}M ` :
                data?.nb_fan / 1000 > 1 ? `${(data?.nb_fan / 1000).toFixed(1)}K ` :
                  ` ${data?.nb_fan} `
            } fans
        </span>
      }
      {
        (data?.type != 'artist') &&
        <span className="flex flex-row items-center justify-center"><BsDot size={20} /><MdExplicit size={20} /></span>
      }
    </>
  )
}

export default SongInfo
