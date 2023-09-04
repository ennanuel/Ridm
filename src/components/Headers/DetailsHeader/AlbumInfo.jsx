import { BsDot } from "react-icons/bs"

const AlbumInfo = ({ data }) => {
    
    return (
        <>
        {
            data.type == 'album' ? 
            <>
            <span>{(new Date(data.release_date)).getFullYear()}</span>
            <BsDot size={20} />
            <span>
                {data.nb_tracks} songs
            </span>
            <BsDot size={20} />
            <span>
                {
                    Math.floor(data.duration/(3600)) ? 
                    Math.floor(data.duration/(3600)) + (Math.floor(data.duration/3600) > 1 ? 
                    ' hrs ' : ' hr ') : 
                    ''
                }
                {
                    Math.floor((data.duration%3600)/60) ? 
                    Math.floor((data.duration%3600)/60) + (Math.floor((data.duration%3600)/60) > 1 
                    ? ' mins ' : ' min ') : 
                    ''
                }
                {data.duration%60 ? data.duration%60 + (data.duration%60 > 1 ? ' secs' : ' sec') : ''}
            </span>
            </> :
            <a href="#albums">
                {
                    data.type == 'artist' ?
                    data?.nb_album + ' releases' :
                    data?.album?.title.length > 30 ?
                    data?.album?.title.substring(0, 30) + '...' :
                    data?.album?.title
                }
            </a>
        }
        </>
    )
}

export default AlbumInfo
