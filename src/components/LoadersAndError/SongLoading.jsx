import { useState, useMemo } from 'react'


const Song = () => (
    <div className='flex gap-2 p-2 bg-white/5 loading-animation rounded-md'>
        <div className="w-[80px] aspect-square rounded-md bg-black/50"></div>
        <div className="flex flex-1 flex-col justify-center gap-2">
            <div className="w-[30%] h-[15px] rounded-sm bg-black/50"></div>
            <div className="w-[20%] h-[10px] rounded-sm bg-black/50"></div>
            <div className="w-[40%] h-[10px] rounded-sm bg-black/50"></div>
        </div>
    </div>
);


const SongLoading = ({ num, full }) => {
    const songs = useMemo(() => {
        if (!num || typeof (num) !== 'number') return [];

        const values = [];
        for (let i = num; i > 0 && values.length <= num; i--) values.push(i);
        
        return values;
    }, [])

    return (
        <div className={`grid grid-cols-1 ${!full && 'md:grid-cols-2'} gap-2 gap-x-4`}>
            {
                songs.map( song => <Song key={song} /> )
            }
        </div>
    )
}

export default SongLoading
