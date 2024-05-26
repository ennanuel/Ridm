import { FaGlobe } from "react-icons/fa"
import { useGetCountryInfoQuery } from '../../redux/services/DeezerApi'

const Footer = () => {
  const { data, isFetching, error } = useGetCountryInfoQuery()

  return (
    <footer className="px-2 flex flex-1 flex-col justify-end gap-6 items-start">
      <button className="px-2 border border-white/5 bg-white/5 h-[34px] rounded-[20px] text-gray-300 text-xs font-semibold flex flex-row items-center justify-center gap-2">
        <FaGlobe size={15} />
        <span className="mr-1">
          {
            isFetching ?
              'Loading...' :
              error ?
                'Error' :
                data?.country
          }
        </span>
      </button>
      <div className="flex flex-col gap-4">
        <p className="font-semibold text-gray-200 text-sm">Powered By</p>
        <ul className="grid grid-cols-2 text-[0.7em] text-gray-500 gap-2">
          <li className="hover:text-white hover:underline"><a href="https://developer.deezer.com" target="_blank">Deezer</a></li>
          <li className="hover:text-white hover:underline"><a href="https://developer.musixmatch.com" target="_blank">MusixMatch</a></li>
          <li className="hover:text-white hover:underline"><a href="https://ezema.netlify.app" taget="_blank">Ezema</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
