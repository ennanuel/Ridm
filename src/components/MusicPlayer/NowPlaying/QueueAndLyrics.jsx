import { LyricLoading, Error } from '../../LoadersAndError'
import { SongLyrics } from '../../List'
import QueueSong from './QueueSong'

const QueueAndLyrics = ({ currentSongs, isFetching, lyrics, error, lyricsQueue, currentIndex, handleDragOver, handleDragEnd }) => {
    const songLyrics = lyrics?.message?.body?.lyrics?.lyrics_body
    .replace(/(\*{7}[a-z|\s]+\*{7}|\(\d+\))/ig, '')
    .split('\n')

    return (
        <div className="h-[80vh] overflow-clip overflow-y-scroll flex flex-col bg-black/80 rounded-lg border-2 border-white/10">
            {
                lyricsQueue ?
                currentSongs.map( (song, i) =>
                    <QueueSong 
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
