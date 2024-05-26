import { BsDot } from "react-icons/bs"
import { Link } from "react-router-dom"

const AlbumInfo = ({ data }) => {
    
    return (
        <>
            {
                data.type == 'album' &&
                <>
                    <span>{(new Date(data.release_date)).getFullYear()}</span>
                    <BsDot size={20} />
                    <span>
                        {data.nb_tracks} songs
                    </span>
                    <BsDot size={20} />
                </>
            }
            {
                data?.type != 'artist' &&
                <>
                    <span>
                        {
                            Math.floor(data.duration / (3600)) ?
                                Math.floor(data.duration / (3600)) + (Math.floor(data.duration / 3600) > 1 ?
                                    ' hrs ' : ' hr ') :
                                ''
                        }
                        {
                            Math.floor((data.duration % 3600) / 60) ?
                                Math.floor((data.duration % 3600) / 60) + (Math.floor((data.duration % 3600) / 60) > 1
                                    ? ' mins ' : ' min ') :
                                ''
                        }
                        {data.duration % 60 ? data.duration % 60 + (data.duration % 60 > 1 ? ' secs' : ' sec') : ''}
                    </span>
                    <BsDot size={20} />
                </>
            }
            {data?.type == 'artist' && <a href="#albums">{data?.nb_album} releases </a>}
            {
                data?.type == 'track' &&
                <>
                    <Link to={`/albums/${data?.album?.id}`}>
                        {
                            data?.album?.title.length > 30 ?
                                data?.album?.title.substring(0, 30) + '...' :
                                data?.album?.title
                        }
                    </Link>
                    <BsDot size={20} />
                </>
            }
        </>
    )
}

export default AlbumInfo
