import { useMemo, useState } from 'react';

import { SongLyrics } from '../../List';
import QueueSong from './QueueSong';

import { playSongs } from '../../../utils/player';

const QueueAndLyrics = ({ currentSongs, activeSong, lyricsQueue, currentIndex, bg, bg2 }) => {
    const [queueIndex, setQueueIndex] = useState(null);
    
    const lyricsBackground = useMemo(() => ({
        background: (window.innerWidth < 1024) && `linear-gradient(${bg2}, ${bg})`
    }), [bg, bg2]);

    function handleDragOver (event, index) {
        if (event.target.closest('.queue_song')) setQueueIndex(index);
        else setQueueIndex(0);
    }

    function handleDragEnd (event, song, index) {
        event.target.style.opacity = '1';
        if (index === null) return;
        let queue = currentSongs;
        queue = queue.filter((elem, i) => i !== index);
        queue.splice(queueIndex, 0, song);
        const currentIndex = queue.findIndex(elem => elem.id === activeSong.id);
        playSongs({ song: activeSong, tracks: queue, i: currentIndex });
    }

    return (
        <div id="queue_lyrics" className={`lg:flex lg:flex-row justify-stretch items-stretch gap-6 mx-3 mb-3 rounded-lg lg:shadow-none shadow-xl shadow-black/10 transition-colors min-h-[60vh]`}>
            <div style={lyricsBackground} className={`h-full rounded-md flex-1 invisible_scroll p-3 overflow-y-scroll ${lyricsQueue && 'hidden lg:block'}`}>
                {
                    <SongLyrics
                        songId={activeSong.id}
                        nowPlaying={true}
                    />
                }
            </div>
            <div className={`h-full rounded-md flex-1 lg:p-2 lg:gap-2 invisible_scroll flex flex-col bg-black/50 p-2 md:p-0 overflow-y-scroll ${!lyricsQueue && 'hidden lg:block'}`}>
                {
                    currentSongs.map((song, i, tracks) =>
                        <QueueSong
                            color={bg}
                            handleDragOver={(e) => handleDragOver(e, i)}
                            handleDragEnd={(e) => handleDragEnd(e, song, i)}
                            song={song}
                            tracks={tracks}
                            key={i}
                            i={i}
                            currentSong={i === currentIndex}
                        />
                    )
                }
            </div>
        </div>
    )
};

export default QueueAndLyrics
