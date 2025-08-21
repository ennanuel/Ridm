import { useState, useRef, useMemo } from "react";
import ColorThief from 'colorthief';

import { RiArrowLeftLine } from "react-icons/ri";

import QueueAndLyrics from "./QueueAndLyrics";
import ChangeQueueLyrics from "./ChangeQueueLyrics";
import Volume from "./Volume";
import Track from "./Track";
import Controls from "./Controls";


const NowPlaying = ({ close, open, nowPlaying, activeSong, currentSongs, currentIndex, isPlaying, shuffle, repeat, duration, volume, setVolume, setSeekTime, appTime }) => {
    const [lyricsQueue, setLyricsQueue] = useState(false);
    const [colors, setColors] = useState([]);
    const imgRef = useRef(null);

    const style = useMemo(() => ({
        background: `linear-gradient(${colors[0]}, transparent)`,
        '--bg1': colors[0],
        '--bg2': colors[1]
    }), [colors]);

    const handleLoad = () => {
        const colorThief = new ColorThief();
        const colors = colorThief.getPalette(imgRef.current, 3);
        setColors(colors.map(([r, g, b]) => `rgba(${r}, ${g}, ${b})`));
    }

    return (
        <div className={`fixed bottom-0 right-0 lg:p-2 z-[9999999999] h-[100dvh] w-full lg:w-[calc(100vw-308px)] flex flex-col ${nowPlaying ? 'bg-[#101010]' : 'pointer-events-none'}`}>
            <div
                style={style}
                className={`invisible_scroll flex-1 lg:h-[calc(100vh-16px)] w-full overflow-y-scroll overflow-x-clip lg:border lg:border-white/5 rounded-lg lg:rounded-[15px] grid grid-cols-1 grid-rows-[auto_83vh_auto_auto] lg:grid-rows-[210px_calc(100vh-246px)] gap-2 transition-[transform,opacity] lg:origin-top-right ${!nowPlaying && 'translate-y-[105%] lg:translate-y-0 scale-y-50 lg:scale-x-50 lg:opacity-0 pointer-events-none'}bg-gray-700`}
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
                    currentSongs={currentSongs}
                    activeSong={activeSong}
                    lyricsQueue={lyricsQueue}
                    currentIndex={currentIndex}
                />
            </div>
        </div>
    )
};

export default NowPlaying
