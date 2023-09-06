import { Link } from "react-router-dom"

const GenreCard = ({ genre, i }) => {
  return (
    <Link to={'/genres/' + genre.id}>
        <div style={{'--delay': i/10 + 's'}} className="genre-card relative rounded-md overflow-hidden w-full bg-white/5 transition-[background-color,transform] hover:bg-white/10 cursor-pointer">
            <img src={genre.picture_medium} alt={genre.name} />
            <div className="absolute bottom-0 left-0 px-4 w-full h-full flex flex-col items-end justify-end transition-colors bg-black/60 hover:bg-black/80">
            <p className="text-gray-300 font-bold text-xs text-right">editorial</p>
            <p className="text-white font-semibold text-base uppercase text-lg text-right">{genre.name}</p>
            </div>
        </div>
    </Link>
  )
}

export default GenreCard
