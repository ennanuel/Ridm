import { Link, useNavigate } from "react-router-dom";
import { BsDot } from 'react-icons/bs';
import PlayPause from "./PlayPause";
import { pause } from "../../utils/player";
import { fetchSongs } from "../../utils/fetchData";


const AlbumCard = ({ album, i, isRelated, isRecent, activeSong, isPlaying }) => {
    const navigate = useNavigate()

    const handleClick = (e) => {
        if (e.target.getAttribute('class').includes('play_pause')) return;
        navigate(`/albums/${album.id}`)
    }
    function playSongs() {
        fetchSongs(album)
    }

    return (
        <div 
            style={{'--delay': (i/10) + 's'}} 
            onClick={handleClick} 
            className="album-card group p-3 rounded-xl flex flex-col flex-1 hover:bg-white/5 transition-[background-color] top-0 cursor-pointer"
        >
            <div className="relative">
                <img
                    className="transition-transform w-full aspect-square rounded-lg"
                    alt=""
                    src={album?.cover_medium}
                />
                <div className={`group-hover:opacity-100 group-hover:pointer-events-auto opacity-0 transition-opacity pointer-events-none hidden lg:flex absolute top-0 left-0 w-full h-full bg-black/50 items-end justify-end p-2`}>
                    <span className="group-hover:translate-y-0 group-hover:opacity-100 translate-y-[-30%] opacity-0 transition-[opacity,transform] duration-300">
                        <PlayPause 
                            handlePlay={playSongs} 
                            isCurrent={activeSong?.album?.title === album?.title} 
                            handlePause={pause} activeSong={activeSong} 
                            isPlaying={isPlaying} 
                            cover={true} 
                        />
                    </span>
                </div>
            </div>
            {
                isRelated || isRecent ?
                <Link to={`/artists/${album?.artist?.id}`}>
                    <p className="text-gray-400 text-xs mt-3 mb-1 font-semibold truncate">{album?.artist?.name}</p>
                </Link> :
                <>
                    {
                        album?.record_type &&
                        <p className="flex flex-row full-w items-center text-gray-400 font-semibold mt-2 mb-1 text-[0.65em]">
                            <span className="uppercase px-[5px] py-[3px] bg-black/50">{album?.record_type}</span>
                            <BsDot size={15} />
                            <span className="uppercase px-[5px] py-[3px] bg-black/50">{new Date(album?.release_date).getFullYear()}</span>
                        </p>
                    }
                </>
            } 
            <p className="text-sm truncate text-white font-semibold">{album?.title}</p>
        </div>
    )
}

export default AlbumCard;
