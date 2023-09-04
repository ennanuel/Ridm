import React from 'react'
import { LyricLoading, Error } from '../LoadersAndError'

const SongLyrics = ({ lyrics, lyricsData, isFetching, error }) => {

    if(isFetching) return <LyricLoading num={8} />

    if(error) return <Error title="Could not load lyrics." />
        
    return (
        <div className="mt-3 mb-8 px-3 backdrop-blur-xl">
            {
                lyrics ?
                lyrics.map( line => <p className="text-white text-md font-bold my-1">{line}</p> ) :
                <p className="text-gray500 text-md font-bold text-gray-300">"Sorry, no lyrics found!"</p>
            }

            <p className="text-xs text-gray-500">
                { 
                    lyricsData?.message?.body?.lyrics?.lyrics_copyright.split(' ').map(
                        elem => elem == 'www.musixmatch.com.' ? <a href="https://www.musixmatch.com" target="_blank" className="text-gray-400 font-semibold">{'musixmatch. '}</a> : elem + ' '
                    ) 
                }
            </p>
        </div>
    )
}

export default SongLyrics
