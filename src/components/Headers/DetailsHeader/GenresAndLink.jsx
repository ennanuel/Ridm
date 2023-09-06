import { useMemo } from "react"
import { Link } from "react-router-dom"

import { FaDeezer } from "react-icons/fa"

const GenresAndLink = ({ data, text, bg }) => {
    const genres = useMemo(() => data?.genres?.data, [data])

    return (
        <div className='mx-4 flex flex-row justify-between items-center gap-2 flex-wrap relative'>
            {
                (data.type === 'album') && 
                <p className="flex flex-row items-center gap-1">
                {
                    genres &&
                    genres?.map(
                        (genre, i) =>
                        <Link key={i} to={`/genres/${genre.id}`} style={{ color: text }} className="text-xs w-fit font-bold">
                            {genre.name}{i !== genres.length ? ',' : ''}
                        </Link>
                    )
                }
                </p>
            }
            <a target="_blank" href={data?.link} style={{ backgroundColor: text, color: bg }} className="font-bold px-2 py-1 rounded-sm flex flex-row gap-1 items-center text-xs opacity-60 backdrop-blur-lg">
                <span><FaDeezer size={20} /></span><span>{data.type == 'artist' ? 'View artist ' : 'Listen '} on Deezer</span>
            </a>
        </div>
    )
}

export default GenresAndLink
