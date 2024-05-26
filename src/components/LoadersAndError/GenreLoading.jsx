import { useState, useEffect } from 'react'

const Genre = () => (
    <div className='w-full aspect-square flex flex-col items-end justify-end gap-2 p-2 rounded-lg bg-white/5'>
        <div className="bg-black/50 rounded-md loading-animation w-full aspect-square"></div>
        <div className="bg-black/50 h-3 w-[50%] rounded-md"></div>
        <div className="w-[70%] h-[25px] rounded-lg bg-black/50"></div>
    </div>
)

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

    return (
        <div className='grid grid-cols-2 lg:grid-cols-4 md:grid-cols-3 lg:gap-6 md:gap-4 gap-2'>
            {
                genres.map( genre => <Genre key={genre} /> )
            }
        </div>
    )
}

export default GenreLoading
