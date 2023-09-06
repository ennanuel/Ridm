import ArtistChart from "./ArtistChart"
import SongChart from "./SongChart"
import AlbumChart from "./AlbumChart"
import RadioChart from "./RadioChart"

import { Link } from "react-router-dom"

import { MdArrowBackIos } from "react-icons/md"
import { useSelector } from "react-redux"

const index = ({ category, active, i }) => {
    const { blacklist, favorites } = useSelector( state => state.library )
    const origin = i === 0 ? 'origin-top-left' : i === 1 ? 'origin-top-right' : i === 2 ? 'origin-bottom-left' : i === 3 ? 'origin-bottom-right' : ''
    
    return (
        <div 
            className={`w-full h-full duration-300 transition-[opacity,transform] ${active ? '' : 'scale-50 opacity-0 pointer-events-none h-0'} ${origin}`}
        >
            <div className="flex flex-row justify-between items-center mb-2">
                <div className="overflow-hidden text-white text-xl font-bold lowercase">
                    <p className={`transition-transform duration-500 ${active ? 'translate-y-0 delay-200 ' : 'translate-y-[100%]'}`}>{category.name}s</p>
                </div>
                <Link to="/charts" className="lg:hidden hover:text-white relative z-1 text-gray-300 flex items-center justify-center text-xs">
                    <MdArrowBackIos size={12} />
                    <span>Back</span>
                </Link>
            </div>
            {
                active && 
                    (
                        category.name === 'artist' ?
                        <ArtistChart blacklist={blacklist} favorites={favorites} /> :
                        category.name === 'song' ?
                        <SongChart blacklist={blacklist} favorites={favorites} /> :
                        category.name === 'album' ?
                        <AlbumChart blacklist={blacklist} favorites={favorites} /> :
                        category.name === 'radio' ?
                        <RadioChart blacklist={blacklist} favorites={favorites} /> :
                        null
                    )
            }
        </div>
    )
}

export default index
