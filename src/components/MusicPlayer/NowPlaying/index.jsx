import { useState } from "react"

import { useGetLyricsQuery } from "../../../redux/services/MusixMatchApi"
import { useGetSongDetailsQuery } from "../../../redux/services/DeezerApi"

import Buttons from "./Buttons"
import QueueAndLyrics from "./QueueAndLyrics"
import ChangeQueueLyrics from "./ChangeQueueLyrics"
import Volume from "./Volume"
import Track from "./Track"
import Controls from "./Controls"


const NowPlaying = ({ handleClick, play, pause, next, prev, onShuffle, offShuffle, onRepeat, offRepeat, dispatch, nowPlaying, activeSong, currentSongs, currentIndex, isPlaying, shuffle, repeat, duration, volume, setVolume, setSeekTime, appTime, playSongs}) => {
    const [move, setMove] = useState(false)
    const [lyricsQueue, setLyricsQueue] = useState(false)
    const [songIndex, setSongIndex] = useState(null)
    
    const { data: song } = useGetSongDetailsQuery(activeSong.id)
    const { data: lyrics, isFetching, error } = useGetLyricsQuery(song?.isrc)

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
        <div style={{backgroundColor: window.innerWidth < 1024 ? 'var(--color)' : ''}} className={`fixed overflow-clip lg:absolute origin-bottom lg:origin-top-right bottom-0 lg:top-0 right-0 z-[9999] w-full h-[98%] lg:h-[100vh] flex flex-row gap-6 items-center justify-center bg-black/70 backdrop-blur-lg p-[30px] transition-[opacity,transform] ${nowPlaying ? 'scale-100 opacity-100 translate-y-0' : 'pointer-events-none opacity-0 lg:scale-50 lg:translate-y-0 translate-y-[100%]'} rounded-tl-xl rounded-tr-xl lg:rounded-none`}>
            <Buttons 
                setMove={setMove} 
                move={move} 
                handleClick={handleClick}
                nowPlaying={nowPlaying}
            />
            <button onMouseOver={handleClick} className="absolute lg:hidden z-[4] top-2 left-[50%] translate-x-[-50%] h-[5px] w-[120px] rounded-lg bg-white/50"></button>

            <div className={`player-controls absolute h-full w-full lg:w-fit top-0 left-0 lg:relative flex-1 flex flex-col items-center justify-center gap-4 md:gap-3 transition-[opacity,transform] ${move && 'translate-x-[-100%] opacity-0 lg:translate-x-0 lg:opacity-0'}`}>
                <Track 
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

            <div className={`flex-1 flex flex-col gap-5 transition-[opacity,transform] ${move ? 'translate-x-0 opacity-100' : 'translate-x-[100%] lg:translate-x-0 opacity-0 lg:opacity-100'}`}>
                <QueueAndLyrics 
                    isFetching={isFetching}
                    error={error}
                    currentSongs={currentSongs} 
                    lyrics={lyrics} 
                    lyricsQueue={lyricsQueue} 
                    currentIndex={currentIndex} 
                    handleDragOver={handleDragOver} 
                    handleDragEnd={handleDragEnd}
                />
                <ChangeQueueLyrics setLyricsQueue={setLyricsQueue} lyricsQueue={lyricsQueue} />
            </div>
        </div>
    )
}

export default NowPlaying
