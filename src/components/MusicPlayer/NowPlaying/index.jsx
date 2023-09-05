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
        <div className="fixed z-[9999] bottom-0 left-0 h-[97vh] lg:h-[100vh] w-full lg:w-[calc(100vw-300px)] overflow-y-scroll overflow-x-clip rounded-lg bg-gradient-to-b from-orange-800 to-black flex flex-col gap-4">
            <button onMouseOver={handleClick} className="sticky top-0 lg:hidden z-[4] m-auto h-[10px] w-[120px] rounded-lg bg-white"></button>

            <div className="min-h-[85vh] p-4 flex flex-col items-stretch justify-between gap-4">
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

            <div className="flex flex-col gap-4">
                <ChangeQueueLyrics setLyricsQueue={setLyricsQueue} lyricsQueue={lyricsQueue} />
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
            </div>
        </div>
    )
}

export default NowPlaying
