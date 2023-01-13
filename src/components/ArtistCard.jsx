import { useNavigate } from 'react-router-dom'

const ArtistCard = ({ artist, i }) => {
  const navigate = useNavigate()
  
  return (
    <div className="flex flex-col w-[250px] p-4  animate-slideup rounded-lg cursor-pointer" onClick={() => { navigate(`/artists/${artist.id}`) }}>
      <img alt="artist" src={artist?.picture_medium} className="w-full rounded-full" />
      <p className="mt-4 font-bold text-lg text-white text-center truncate">{artist.name}</p>
    </div>
  )
};

export default ArtistCard;
