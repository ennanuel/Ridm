import { useNavigate } from 'react-router-dom'

const ArtistCard = ({ artist, i }) => {
  const navigate = useNavigate()
  
  return (
    <div style={{'--delay': i/20 + 's'}} className="artist-card flex flex-col p-2 md:p-3 rounded-xl cursor-pointer transition-[background-color] hover:bg-white/5" onClick={() => { navigate(`/artists/${artist.id}`) }}>
      <img alt="artist" src={artist?.picture_medium} className="w-full aspect-square rounded-full" />
      <p className="mt-3 font-bold text-[0.7em] text-gray-400 text-left truncate">{artist.type}</p>
      <p className="font-semibold text-sm text-white text-left truncate">{artist.name}</p>
    </div>
  )
};

export default ArtistCard;
