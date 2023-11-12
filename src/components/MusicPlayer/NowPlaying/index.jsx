import { useState, useRef, useMemo } from "react"
import ColorThief from 'colorthief'

import { useGetLyricsQuery } from "../../../redux/services/MusixMatchApi"
import { useGetSongDetailsQuery } from "../../../redux/services/DeezerApi"

import QueueAndLyrics from "./QueueAndLyrics"
import ChangeQueueLyrics from "./ChangeQueueLyrics"
import Volume from "./Volume"
import Track from "./Track";
import Controls from "./Controls";
import { RiArrowLeftLine } from "react-icons/ri";


const NowPlaying = ({ close, open, nowPlaying, activeSong, currentSongs, currentIndex, isPlaying, shuffle, repeat, duration, volume, setVolume, setSeekTime, appTime }) => {
    const [lyricsQueue, setLyricsQueue] = useState(false);
    const [colors, setColors] = useState([]);
    const imgRef = useRef(null);
    const { data: song } = useGetSongDetailsQuery(activeSong.id);
    const { data: lyrics, isFetching, error } = useGetLyricsQuery(song?.isrc);
    const style = useMemo(() => ({
        background: `linear-gradient(${colors[0]}, #151515)`,
        '--bg1': colors[0],
        '--bg2': colors[1]
    }), [colors]);

    const handleLoad = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(imgRef.current, 3);
        setColors(colors.map(([r, g, b]) => `rgba(${r}, ${g}, ${b})`));
    }

    return (
        <>
            <button
                className={`fixed top-0 left-0 w-full h-full hidden lg:block cursor-default ${!nowPlaying && 'hidden pointer-events-none'}`}
                onClick={close}
            ></button>
            <div
                style={style}
                className={`invisible_scroll fixed z-[9999] bottom-0 right-0 h-[100vh] w-full lg:w-[calc(100vw-300px)] overflow-y-scroll overflow-x-clip rounded-lg lg:rounded-none grid grid-cols-1 grid-rows-[30px,83vh,60px,90vh] lg:grid-rows-[210px,calc(100vh-230px)] gap-2 transition-[transform,opacity] lg:origin-top-right ${!nowPlaying && 'translate-y-[105%] lg:translate-y-0 scale-y-50 lg:scale-x-50 lg:opacity-0 pointer-events-none'} bg-gradient-to-b from-orange-800 to-black`}
            >
                <button
                    onMouseOver={close}
                    className="lg:hidden flex items-center justify-center h-3 w-20 aspect-square sticky top-4 m-auto bg-white/80 rounded-md shadow shadow-black/20"
                >
                    <span className="opacity-0">close</span>
                </button>

                <div className="p-6 flex flex-col lg:grid lg:grid-rows-5 lg:grid-cols-[30px,165px,repeat(4,1fr)] items-stretch justify-between gap-4">
                    <button
                        className="lg:block hidden text-white z-[8888]"
                        onClick={close}
                        nowPlaying={nowPlaying}
                    >
                        <RiArrowLeftLine size={30} />
                    </button>
                    <Track
                        imgRef={imgRef}
                        handleLoad={handleLoad}
                        colors={colors}
                        activeSong={activeSong}
                        currentSongs={currentSongs}
                        open={open}
                        duration={duration}
                        appTime={appTime}
                        setSeekTime={setSeekTime}
                    />
                    <Controls
                        isPlaying={isPlaying}
                        repeat={repeat}
                        shuffle={shuffle}
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
                    activeSong={activeSong}
                    lyrics={lyrics}
                    lyricsQueue={lyricsQueue}
                    currentIndex={currentIndex}
                />
            </div>
        </>
    )
};

export default NowPlaying
