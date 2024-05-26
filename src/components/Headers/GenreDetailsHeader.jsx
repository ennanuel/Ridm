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
        <div className="relative w-full min-h-[40vh] rounded-[15px] border border-white/5 flex shadow-lg shadow-black/30">
            <img onLoad={handleLoad} crossOrigin="anonymous" ref={imgRef} src={genre?.picture_xl} className="absolute top-0 rounded-[15px] left-0 w-full h-full object-cover opacity-60" />
            <div style={{ background: `linear-gradient(transparent, ${bg} 80%)` }} className="absolute w-full h-full top-0 left-0 rounded-[15px] opacity-60" />
            {
                isFetching ?
                    <HeaderLoading /> :
                    error ?
                        <Error title="Could not load genre details" /> :
                        <div className="relative flex flex-1 justify-between flex-wrap items-end gap-2 p-2 md:px-4 md:py-8">
                            <div className="flex-1 flex flex-col gap-2">
                                <p style={{ color: text }} className="drop-shadow-lg text-gray-300 text-sm font-bold">{genre?.type}</p>
                                <h2 style={{ color: text }} className="drop-shadow-lg text-white font-bold text-3xl md:text-[4rem]">{genre?.name}</h2>
                            </div>
                            {
                                genre &&
                                <div className="flex flex-row justify-end items-center gap-4 relative md:top-4">
                                    <FavoriteButton text={bg} data={genre} type="genres" />
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
