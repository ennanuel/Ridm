import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { BsDot } from 'react-icons/bs';

import PlayPause from "./PlayPause";

import { pause } from "../../functions/player";
import { fetchSongs } from "../../functions/fetchData";


const AlbumCard = ({ album, i, isRelated, isRecent, activeSong, isPlaying }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = (e) => {
        if (e.target.getAttribute('class').includes('play_pause')) return;
        navigate(`/albums/${album.id}`)
    }

    const pauseSong = () => {
        pause(dispatch)
    }

    const playSongs = () => {
        fetchSongs(dispatch, album)
    }

    return (
        <div 
            style={{'--delay': (i/10) + 's'}} 
            onClick={handleClick} 
            className="album-card p-2 relative flex flex-col flex-1 hover:bg-white/5 transition-[background-color,top] top-0 hover:top-[-10px] cursor-pointer"
        >
            <div className="relative">
                <img className="transition-transform shadow shadow-black w-full aspect-square" alt="song_img" src={album?.cover_medium} />
                <div className={`album_overlay ${activeSong?.album?.title !== album?.title ? 'show_overlay' : ''} absolute top-0 left-0 w-full h-full bg-black/50 flex items-end justify-end p-2`}>
                    <PlayPause 
                        handlePlay={playSongs} 
                        isCurrent={activeSong?.album?.title === album?.title} 
                        handlePause={pauseSong} activeSong={activeSong} 
                        isPlaying={isPlaying} 
                        cover={true} 
                    />
                </div>
            </div>
            {
                isRelated || isRecent ?
                <Link to={`/artists/${album?.artist?.id}`}>
                    <p className="text-gray-400 text-xs mt-2 mb-1 font-semibold truncate">{album?.artist?.name}</p>
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
