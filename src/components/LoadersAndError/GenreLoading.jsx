import { useMemo } from 'react';

const Genre = () => (
    <div className='relative overflow-clip loading-animation w-full aspect-[2] flex flex-col items-start justify-start gap-2 p-2 rounded-lg bg-white/5'>
        <div className="absolute bottom-[-10px] right-[-10%] bg-black/50 rounded-md rotate-[20deg] h-[calc(100%-30px)] aspect-square"></div>
        <div className="bg-black/50 h-3 w-[30%] rounded-md"></div>
        <div className="w-[50%] h-[25px] rounded-lg bg-black/50"></div>
    </div>
)

const GenreLoading = ({ num }) => {
    const genres = useMemo(() => {
        if (!num || typeof (num) !== 'number') return [];

        const values = [];

        for (let i = num; i > 0 && values.length <= num; i--) values.push(i);

        return values;
    }, [])

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:gap-6 md:gap-4 gap-2'>
            {
                genres.map( genre => <Genre key={genre} /> )
            }
        </div>
    )
}

export default GenreLoading
