import { BsDot } from "react-icons/bs"

const AlbumInfo = ({ albumData, artistId, artistData, songData }) => {
  return (
    <>
    {
        albumData ? 
        <>
        <span>{(new Date(albumData.release_date)).getFullYear()}</span>
        <BsDot size={20} />
        <span>
            {albumData.nb_tracks} songs
        </span>
        <BsDot size={20} />
        <span>
            {
                Math.floor(albumData.duration/(3600)) ? 
                Math.floor(albumData.duration/(3600)) + (Math.floor(albumData.duration/3600) > 1 ? 
                ' hrs ' : ' hr ') : 
                ''
            }
            {
                Math.floor((albumData.duration%3600)/60) ? 
                Math.floor((albumData.duration%3600)/60) + (Math.floor((albumData.duration%3600)/60) > 1 
                ? ' mins ' : ' min ') : 
                ''
            }
            {albumData.duration%60 ? albumData.duration%60 + (albumData.duration%60 > 1 ? ' secs' : ' sec') : ''}
        </span>
        </> :
        <a href="#albums">{artistId ? artistData.nb_album + ' releases' : songData?.album?.title}</a>
    }
    </>
  )
}

export default AlbumInfo
