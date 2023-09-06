import { LyricLoading, Error } from '../../LoadersAndError'
import { SongLyrics } from '../../List'
import QueueSong from './QueueSong'

const QueueAndLyrics = ({ currentSongs, isFetching, lyrics, error, lyricsQueue, currentIndex, handleDragOver, handleDragEnd, bg, bg2 }) => {
    const songLyrics = lyrics?.message?.body?.lyrics?.lyrics_body
    .replace(/(\*{7}[a-z|\s]+\*{7}|\(\d+\))/ig, '')
    .split('\n')

    return (
        <div
            id="queue_lyrics"
            className={`lg:flex lg:flex-row gap-6 mx-3 mb-3 rounded-lg lg:shadow-none shadow-lg shadow-black/50 transition-colors`}
        >
            <div 
                style={{ background: (window.innerWidth < 1024) && `linear-gradient(${bg2}, ${bg})` }}
                className={`rounded-md flex-1 invisible_scroll p-3 overflow-y-scroll ${(lyricsQueue && window.innerWidth < 1024) && 'hidden'}`}
            >
                {
                    (
                        isFetching ?
                        <LyricLoading num={8} /> : 
                        error ?
                        <Error title="Something went wrong" /> :
                        <SongLyrics lyrics={songLyrics} isFetching={isFetching} error={error} />
                    )
                }
            </div>
            <div className={`rounded-md flex-1 lg:p-2 lg:gap-2 invisible_scroll flex flex-col bg-black/50 overflow-y-scroll ${(!lyricsQueue && window.innerWidth < 1024) && 'hidden'}`}>
                {
                    currentSongs.map((song, i) =>
                        <QueueSong
                            color={bg}
                            handleDragOver={(e) => handleDragOver(e, i)}
                            handleDragEnd={(e) => handleDragEnd(e, song, i)}
                            song={song}
                            key={i}
                            i={i}
                            currentSong={i === currentIndex}
                        />
                    )
                }
            </div>
        </div>
    )
}

export default QueueAndLyrics
