import { Link } from "react-router-dom"

import { BsDot } from "react-icons/bs"

const Contributor = ({ contributor }) => {
  return (
    <Link to={`/artists/${contributor.id}`}>
      <div className="flex flex-row items-center ml-[-20px]">
        <img 
          src={ contributor.picture_small } 
          alt="artist" 
          className={`relative shadow-md shadow-black bottom-0 left-5 rounded-full h-full max-h-[30px] w-auto block`}
        />
        <p className="relative text-md font-bold text-gray-200 ml-6">{contributor.name}</p>
        <BsDot size={20} className="text-gray-300" />
      </div>
    </Link>
  )
}

export default Contributor
