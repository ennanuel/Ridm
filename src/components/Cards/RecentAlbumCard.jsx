import { Link } from 'react-router-dom'

const RecentAlbumCard = ({ album, i}) => {
  return (
    <Link to={`/albums/${album.id}`}>
        <div style={{background: `center / cover url(${album.cover_medium})`}} className="relative h-[100px] rounded-lg flex flex-col items-start justify-center overflow-clip shadow-lg shadow-black">
            <div className="w-full h-full absolute bg-gradient-to-r from-black to-black/40" />
            <p className="relative mx-4 truncate text-white font-semibold text-xs">{album.title}</p>
            <p className="relative mx-4 truncate text-gray-300 font-semibold text-[0.7em]">{album.artist.name}</p>
        </div>
    </Link>
  )
}

export default RecentAlbumCard
