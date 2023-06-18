import { LyricLoading, Error } from '../../LoadersAndError'
import { SongLyrics } from '../../List'
import QueueSong from './QueueSong'

const QueueAndLyrics = ({ currentSongs, isFetching, lyrics, error, lyricsQueue, currentIndex, handleDragOver, handleDragEnd }) => {
    const songLyrics = lyrics?.message?.body?.lyrics?.lyrics_body
    .replace(/(\*{7}[a-z|\s]+\*{7}|\(\d+\))/ig, '')
    .split('\n')

    return (
        <div className="h-[82vh] w-[90vw] md:w-full overflow-clip overflow-y-scroll flex flex-col lg:bg-black/80 rounded-lg">
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
