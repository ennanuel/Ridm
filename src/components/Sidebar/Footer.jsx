import { FaGlobe } from "react-icons/fa"
import { useGetCountryInfoQuery } from '../../redux/services/DeezerApi'

const Footer = () => {
  const { data, isFetching, error } = useGetCountryInfoQuery()

  return (
    <footer className="flex flex-col justify-start items-start">
        <button className="px-1 mb-8 border-2 border-white h-[34px] rounded-[17px] text-white text-sm font-semibold flex flex-row items-center justify-center gap-2">
            <FaGlobe size={17} /> 
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
        <p className="font-semibold text-gray-200 text-sm mb-4">Powered By</p>
        <ul className="grid grid-cols-2 text-[0.7em] text-gray-500 gap-2">
            <li className="hover:text-white hover:underline"><a href="https://developer.deezer.com" target="_blank">Deezer API</a></li>
            <li className="hover:text-white hover:underline"><a href="https://developer.musixmatch.com" target="_blank">MusixMatch API</a></li>
            <li className="hover:text-white hover:underline">Wiki API</li>
        </ul>
    </footer>
  )
}

export default Footer
