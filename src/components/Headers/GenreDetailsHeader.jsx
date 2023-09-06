import { useRef, useState } from "react"
import ColorThief from 'colorthief';
import { FavoriteButton } from "../Buttons"
import { Error } from "../LoadersAndError"
import HeaderLoading from "../LoadersAndError/HeaderLoading"
import { Options } from "../Options"

const GenreDetailsHeader = ({ genre, charts, isFetching, error, setColors, bg, text }) => {
    const imgRef = useRef();

    const handleLoad = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(imgRef.current).slice(0, 2);
        if (colors.length !== 2) return;
        setColors( colors.map(([r,g,b], i) => `rgba(${r}, ${g}, ${b})`) )
    }

    return (
        <div style={{ boxShadow: `0 40px 50px ${bg}` }} className="relative w-full h-[50vh] mt-[-60px]">
            <img onLoad={handleLoad} crossOrigin="anonymous" ref={imgRef} src={genre?.picture_xl} className="absolute top-0 left-0 w-full h-full object-cover" />
            <div style={{ background: `linear-gradient(transparent, ${bg} 80%)`}} className="absolute w-full h-full top-0 left-0" />
            {
                isFetching ?
                <HeaderLoading /> :
                error ?
                <Error title="Could not load genre details" /> :
                    <div className="relative h-full w-full flex justify-between flex-wrap items-end gap-2 p-2 md:px-4 md:py-8">
                        <div className="flex-1">
                            <p style={{color: text}} className="text-gray-300 text-sm font-bold">{genre?.type}</p>
                            <h2 style={{color: text}} className="text-white font-bold text-3xl md:text-[5em] mt-2">{genre?.name}</h2>
                        </div>
                        {
                            genre &&
                            <div className="flex flex-row justify-end items-center gap-4 relative md:top-4">
                                <FavoriteButton data={genre} type="genres" />
                                <Options 
                                    type="genre" 
                                    favorite={genre?.favorite} 
                                    blacklist={genre?.blacklist}
                                    genre={genre} 
                                    tracks={charts?.tracks?.data} 
                                    song={charts && charts.tracks.data[0]} 
                                    i={0} 
                                />
                            </div>
                        }
                    </div>
            }
        </div>
    )
}

export default GenreDetailsHeader
