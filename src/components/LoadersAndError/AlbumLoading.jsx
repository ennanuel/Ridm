import { useMemo } from 'react';

const Album = () => (
    <div className='flex flex-col gap-2 rounded-md p-2 bg-white/5 loading-animation'>
        <div className="w-full aspect-square rounded-md bg-black/50"></div>
        <div className="w-[40%] h-[20px] rounded-sm bg-black/50"></div>
        <div className="w-[80%] h-[15px] rounded-sm bg-black/50"></div>
    </div>
);

const AlbumLoading = ({ num }) => {
    const albums = useMemo(() => {
        if (!num || typeof (num) !== 'number') return [];

        const values = [];

        for (let i = num; i > 0 && values.length <= num; i--) values.push(i);

        return values;
    }, []);

    return (
        <div className='grid grid-cols-2 lg:grid-cols-5 md:grid-cols-4 lg:gap-6 md:gap-4 gap-2'>
            {
                albums.map( album => <Album key={album} /> )
            }
        </div>
    )
}

export default AlbumLoading
