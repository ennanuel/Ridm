import { FaGlobe } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="flex flex-col justify-start items-start">
        <button className="px-1 mb-8 border-2 border-white h-[34px] rounded-[17px] text-white text-sm font-semibold flex flex-row items-center justify-center gap-2">
            <FaGlobe size={17} /> <span className="mr-1">Nigeria</span>
        </button>
        <p className="font-semibold text-gray-200 text-sm mb-4">Powered By</p>
        <ul className="grid grid-cols-2 text-[0.7em] text-gray-500 gap-2">
            <li>Deezer API</li>
            <li>MusixMatch API</li>
            <li>Wiki API</li>
        </ul>
    </footer>
  )
}

export default Footer
