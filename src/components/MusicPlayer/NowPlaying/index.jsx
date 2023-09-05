import { useState, useRef } from "react"
import ColorThief from 'colorthief'

import { BsArrowDown } from 'react-icons/bs'

import { useGetLyricsQuery } from "../../../redux/services/MusixMatchApi"
import { useGetSongDetailsQuery } from "../../../redux/services/DeezerApi"

import ExpandCollapse from '../ExpandCollapse'

import QueueAndLyrics from "./QueueAndLyrics"
import ChangeQueueLyrics from "./ChangeQueueLyrics"
import Volume from "./Volume"
import Track from "./Track"
import Controls from "./Controls"


const NowPlaying = ({ handleClick, play, pause, next, prev, onShuffle, offShuffle, onRepeat, offRepeat, dispatch, nowPlaying, activeSong, currentSongs, currentIndex, isPlaying, shuffle, repeat, duration, volume, setVolume, setSeekTime, appTime, playSongs}) => {
    const [lyricsQueue, setLyricsQueue] = useState(false)
    const [songIndex, setSongIndex] = useState(null)
    const [colors, setColors] = useState([]);

    const imgRef = useRef()
    
    const { data: song } = useGetSongDetailsQuery(activeSong.id)
    const { data: lyrics, isFetching, error } = useGetLyricsQuery(song?.isrc)

    const handleLoad = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(imgRef.current, 3);
        setColors(colors.map(([r, g, b]) => `rgba(${r}, ${g}, ${b})`))
    }

    const handleDragOver = (e, i) => {
        if(e.target.closest('.queue_song')) {
            setSongIndex(i)
        } else {
            setSongIndex(0)
        }
    }

    const handleDragEnd = (e, song, index) => {
        e.target.style.opacity = '1'

        if(index === null) return;
        let queue = currentSongs
        queue = queue.filter( (elem, i) => i !== index )
        queue.splice(songIndex, 0, song)
        const currentIndex = queue.findIndex( elem => elem.id === activeSong.id )
        
        playSongs({dispatch, song: activeSong, tracks: queue, i: currentIndex})
    }

    return (
        <div
            style={{
                background: `linear-gradient(${colors[0]}, #151515)`,
                '--bg1': colors[0],
                '--bg2': colors[1]
            }}
            className={`fixed z-[9999] bottom-0 right-0 h-[100vh] w-full lg:w-[calc(100vw-300px)] overflow-y-scroll overflow-x-clip rounded-lg lg:rounded-none grid grid-cols-1 grid-rows-[30px,83vh,60px,90vh] lg:grid-rows-[200px,1fr] gap-2 transition-[transform,opacity] lg:origin-[top,right] ${!nowPlaying && 'translate-y-[105%] lg:translate-y-0 scale-y-50 lg:scale-y-20 lg:scale-x-20 lg:opacity-0 pointer-events-none'} bg-gradient-to-b from-orange-800 to-black `}
        >
            <div className="lg:block hidden absolute top-0 left-0">
                <ExpandCollapse onClick={handleClick} nowPlaying={nowPlaying} />
            </div>
            <button onMouseOver={handleClick} className="lg:hidden flex items-center justify-center h-3 w-20 aspect-square sticky top-4 m-auto bg-white/80 rounded-md shadow shadow-black/20">
                <span className="opacity-0">close</span>
            </button>

            <div className="p-6 flex flex-col lg:grid lg:grid-rows-4 lg:grid-cols-5 items-stretch justify-between gap-4">
                <Track 
                    imgRef={imgRef}
                    handleLoad={handleLoad}
                    colors={colors}
                    activeSong={activeSong} 
                    handleClick={handleClick} 
                    duration={duration} 
                    appTime={appTime} 
                    setSeekTime = {setSeekTime}
                />
                <Controls 
                    dispatch={dispatch} 
                    isPlaying={isPlaying} 
                    repeat={repeat} 
                    shuffle={shuffle} 
                    prev={prev} 
                    next={next} 
                    pause={pause} 
                    play={play} 
                    onRepeat={onRepeat} 
                    offRepeat={offRepeat} 
                    onShuffle={onShuffle} 
                    offShuffle={offShuffle} 
                    currentIndex={currentIndex} 
                />
                <Volume volume={volume} setVolume={setVolume} />
            </div>

            <ChangeQueueLyrics setLyricsQueue={setLyricsQueue} lyricsQueue={lyricsQueue} />
            <QueueAndLyrics 
                bg={colors[0]}
                bg2={colors[2]}
                isFetching={isFetching}
                error={error}
                currentSongs={currentSongs} 
                lyrics={lyrics} 
                lyricsQueue={lyricsQueue} 
                currentIndex={currentIndex} 
                handleDragOver={handleDragOver} 
                handleDragEnd={handleDragEnd}
            />
        </div>
    )
}

export default NowPlaying
