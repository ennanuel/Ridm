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
            className={`absolute z-[1] top-0 lg:top-[60px] left-0 w-full h-full p-4 duration-300 transition-[opacity,transform] ${active ? '' : 'scale-50 opacity-0 pointer-events-none max-h-0'} ${origin}`}
        >
            <div className="flex flex-row justify-between items-center mb-4">
                <div className="overflow-hidden text-white text-xl font-bold lowercase">
                    <p className={`transition-transform duration-500 ${active ? 'translate-y-0 delay-200 ' : 'translate-y-[100%]'}`}>{category.name}s</p>
                </div>
                <Link to="/charts" className="hover:text-white lg:hidden text-gray-400 flex items-center justify-center text-sm">
                    <MdArrowBackIos size={15} />
                    <span>Back</span>
                </Link>
            </div>
            {
                active && 
                <div className="relative z-[1]">
                    {
                        category.name === 'artist' ?
                        <ArtistChart blacklist={blacklist} favorites={favorites} /> :
                        category.name === 'song' ?
                        <SongChart blacklist={blacklist} favorites={favorites} /> :
                        category.name === 'album' ?
                        <AlbumChart blacklist={blacklist} favorites={favorites} /> :
                        category.name === 'radio' ?
                        <RadioChart blacklist={blacklist} favorites={favorites} /> :
                        null
                    }
                </div>
            }
        </div>
    )
}

export default index
