import { useState, useEffect } from 'react'

const SongLoading = ({ num }) => {
    const [songs, setSongs] = useState([])

    useEffect(() => {
        if(!num || typeof(num) !== 'number') return;

        setSongs( prev => {
            const values = []
            for(let i = num; i > 0 && values.length <= num; i--) {
                values.push(i)
            }
            return values
        })
    }, [])

    const Song = () => (
        <div className='flex gap-2 p-2 bg-white/5 loading-animation'>
            <div className="w-[80px] aspect-square rounded-md bg-black/50"></div>
            <div className="flex flex-1 flex-col justify-center gap-2">
                <div className="w-[30%] h-[15px] rounded-sm bg-black/50"></div>
                <div className="w-[20%] h-[10px] rounded-sm bg-black/50"></div>
                <div className="w-[40%] h-[10px] rounded-sm bg-black/50"></div>
            </div>
        </div>
    )

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-6 md:gap-4 gap-2'>
            {
                songs.map( song => <Song key={song} /> )
            }
        </div>
    )
}

export default SongLoading
