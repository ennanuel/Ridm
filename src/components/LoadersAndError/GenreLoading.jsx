import { useState, useEffect } from 'react'

const GenreLoading = ({ num }) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        if(!num || typeof(num) !== 'number') return;

        setGenres( prev => {
            const values = []
            for(let i = num; i > 0 && values.length <= num; i--) {
                values.push(i)
            }
            return values
        })
    }, [])

    const Genre = () => (
        <div className='w-full aspect-square flex flex-col items-end justify-end gap-2 p-4 bg-white/5 loading-animation'>
            <div className="w-[70%] h-[25px] rounded-sm bg-black/50"></div>
        </div>
    )

    return (
        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 lg:gap-6 md:gap-4 gap-2'>
            {
                genres.map( genre => <Genre key={genre} /> )
            }
        </div>
    )
}

export default GenreLoading
