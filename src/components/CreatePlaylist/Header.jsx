import { Link } from "react-router-dom"

import { MdChevronLeft } from "react-icons/md"

const Header = () => {
  return (
    <div className="w-full flex justify-between items-center mb-6">
      <h3 className="flex-1 text-white font-bold text-xl">Create new playlist</h3>
      <Link to="/playlists" className='flex justify-center items-center hover:text-gray-100 text-gray-300 text-xs rounded-md'>
        <span className="flex items-center justify-center"><MdChevronLeft size={15} /></span>
        <span>Back</span>
      </Link>
    </div>
  )
}

export default Header
