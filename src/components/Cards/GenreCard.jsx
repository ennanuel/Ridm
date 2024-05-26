import { Link } from "react-router-dom"

const GenreCard = ({ genre, i }) => {
  return (
    <Link
      to={'/genres/' + genre.id}
      style={{ '--delay': i / 10 + 's' }}
      className="genre-card relative p-2 hover:bg-white/5 w-full flex flex-col gap-2 transition-[background-color,transform] rounded-lg aspect-square"
    >
      <img src={genre.picture_medium} alt={genre.name} className="rounded-xl" />
      <div className="flex flex-col items-end justify-end transition-colors">
        <p className="text-gray-300 font-bold text-xs text-right">editorial</p>
        <p className="text-white font-semibold text-base uppercase text-right">{genre.name}</p>
      </div>
    </Link>
  );
}

export default GenreCard
