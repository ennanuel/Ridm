import { useMemo } from 'react';

const TracksLoading = ({ num }) => {
    const tracks = useMemo(() => {
        if (!num || typeof (num) !== 'number') return [];
        
        const values = [];

        for (let i = num; i > 0 && values.length <= num; i--) values.push(Math.ceil(Math.random() * 300));

        return values;
    }, [])

    return (
        <div className='m-2 md:m-4 bg-black/50 border-white/5 rounded-[20px] flex flex-col'>
            <span className="h-[60px] "></span>
            {
                tracks.map((width, index) => (
                    <span key={index} className="h-[50px] border-t border-white/5 px-4 gap-4 flex items-center">
                        <span className='w-4 h-4 rounded-full bg-white/5'></span>
                        <span style={{ maxWidth: `${width}px` }} className='h-5 flex-1 max-w-[200px] loading-animation'></span>
                    </span>
                ))
            }
        </div>
    )
};

export default TracksLoading
