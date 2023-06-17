import { Link } from "react-router-dom"

const SeeMore = ({ link }) => {
  return (
    <Link to={link} className="text-gray-300 font-semibold text-sm transition-opacity opacity-70 hover:opacity-100">See More</Link>
  )
}

export default SeeMore
