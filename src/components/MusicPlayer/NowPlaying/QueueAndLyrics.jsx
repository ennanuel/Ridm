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
            style={{ background: !lyricsQueue && `linear-gradient(${bg2}, ${bg})` }}
            className={`flex flex-col mx-3 mb-3 rounded-lg ${ lyricsQueue ? 'bg-black/50' : 'bg-orange-800' } overflow-y-scroll overflow-x-clip shadow-lg shadow-black/50 transition-colors`}
        >
            {
                lyricsQueue ?
                currentSongs.map( (song, i) =>
                    <QueueSong 
                        color={bg}
                        handleDragOver={(e) => handleDragOver(e, i)} 
                        handleDragEnd={(e) => handleDragEnd(e, song, i)} 
                        song={song} 
                        key={i} 
                        i={i}
                        currentSong={i === currentIndex}
                    /> 
                ) :
                (
                    isFetching ?
                    <LyricLoading num={8} /> : 
                    error ?
                    <Error title="Something went wrong" /> :
                    <SongLyrics lyrics={songLyrics} isFetching={isFetching} error={error} />
                )
            }
        </div>
    )
}

export default QueueAndLyrics
