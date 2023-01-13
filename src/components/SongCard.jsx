import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import { useDispatch } from "react-redux";

const SongCard = ({ song, i, activeSong, isPlaying, tracks }) => {
  const dispatch = useDispatch()
  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, tracks, i}))
    dispatch(playPause(true))
  }

  
  return (
    <div className="song-card flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full group">
        <div className="relative overflow-hidden track-img">
          <div className={`absolute w-full z-10 h-full inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${activeSong?.title === song.title ? 'bg-black bg-opacity-70 flex': 'hidden'}`}>
          <PlayPause
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
            activeSong={activeSong}
            isPlaying={isPlaying}
          />
          </div>
          <img className="z-0" alt="song_img" src={song.album['cover_medium']} />
        </div>

        <div className="mt-4 flex flex-col">
          <p className="font-semibold text-lg text-white truncate">
            <Link to={`/songs/${song.id}`}>
              {song?.title}
            </Link>
          </p>
          <p className="text-sm truncate text-gray-300 mt-1">
            <Link to={`${song.artist? `/artists/${song.artist.id}`: '/top-artists'}`}>
              {song.artist?.name}
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SongCard;
