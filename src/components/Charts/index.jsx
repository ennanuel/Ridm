import ArtistChart from "./ArtistChart";
import SongChart from "./SongChart";
import AlbumChart from "./AlbumChart";
import RadioChart from "./RadioChart";

import { Link } from "react-router-dom";

import { MdArrowBack } from "react-icons/md";

const index = ({ category, active, i }) => {
    const origin = i === 0 ? 'origin-top-left' : i === 1 ? 'origin-top-right' : i === 2 ? 'origin-bottom-left' : i === 3 ? 'origin-bottom-right' : ''
    
    return (
        <div 
            className={`w-full h-full duration-300 transition-[opacity,transform] ${active ? '' : 'scale-50 opacity-0 pointer-events-none h-0'} ${origin}`}
        >
            <div className="mb-2">
                <div className="overflow-hidden text-white font-bold lowercase flex items-center gap-2">
                    <Link to="/charts" className="hover:text-white relative z-1 text-gray-300 flex items-center justify-center">
                        <MdArrowBack size={20} />
                    </Link>
                    <h2 className={`transition-transform duration-500 ${active ? 'translate-y-0 delay-200 ' : 'translate-y-[100%]'} text-xl`}>{category.name}s</h2>
                </div>
            </div>
            {
                active && 
                    (
                        category.name === 'artist' ?
                        <ArtistChart /> :
                        category.name === 'song' ?
                        <SongChart /> :
                        category.name === 'album' ?
                        <AlbumChart /> :
                        category.name === 'radio' ?
                        <RadioChart /> :
                        null
                    )
            }
        </div>
    )
}

export default index
