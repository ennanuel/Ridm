import { useState, useEffect } from 'react'

const LyricLoading = ({ text, num }) => {
    const [lyrics, setLyrics] = useState([])

    useEffect(() => {
        if(!num || typeof(num) !== 'number') return;

        setLyrics( prev => {
            const values = []
            for(let i = num; i > 0 && values.length <= num; i--) {
                values.push(i)
            }
            return values
        })
    }, [])

    const Lyric = ({width}) => (
        <div style={{width}} className='bg-white/5 rounded-md h-[25px] loading-animation'>
        </div>
    )

    return (
        <div className='flex flex-col md:gap-4 gap-2'>
            {
                lyrics.map( lyric => <Lyric key={lyric} width={Math.floor(Math.random() * 100) + '%'} /> )
            }
        </div>
    )
}

export default LyricLoading
