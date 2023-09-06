import { BsDot } from "react-icons/bs"
import { Link } from "react-router-dom"

const Contributors = ({ contributors, text }) => {
  return contributors.map( (contributor, i) => (
    <Link key={i} to={`/artists/${contributor.id}`}>
      <div className="flex flex-row items-center ml-[-20px] opacity-80">
        <img 
          src={ contributor.picture_small } 
          alt="artist" 
          className={`relative shadow-md shadow-black/20 bottom-0 left-5 rounded-full h-full max-h-[30px] w-auto block`}
        />
        <p style={{ color: text }} className="relative text-base font-bold text-gray-200 ml-6">{contributor.name}</p>
        <BsDot size={20} style={{ color: text }} />
      </div>
    </Link>
  ))
}

export default Contributors
