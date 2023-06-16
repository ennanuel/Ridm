import { Link } from "react-router-dom"

import { FaDeezer } from "react-icons/fa"

const GenresAndLink = ({ albumData, artistId }) => {
    return (
        <div className={`mx-4 flex flex-row text-white justify-between items-start gap-2 flex-wrap relative`}>
        {
            (albumData) && 
            <p className="flex flex-row items-center gap-1">
            {
                albumData &&
                albumData.genres.data.map( (genre, i, genres) => <span className="text-gray-400 text-xs w-fit font-normal">
                <Link to={`/genres/${genre.id}`}>
                    {genre.name}{i !== genres.length ? ',' : ''}
                </Link>
                </span> )
            }
            </p>
        }
        <a href="#" className="font-semibold px-2 py-1 rounded-sm bg-white/10 w-fit text-gray-200 flex flex-row gap-1 items-center text-xs opacity-60 backdrop-blur-lg">
            <span><FaDeezer size={20} /></span><span>{artistId ? 'View artist ' : 'Listen '} on Deezer</span>
        </a>
        </div>
    )
}

export default GenresAndLink
