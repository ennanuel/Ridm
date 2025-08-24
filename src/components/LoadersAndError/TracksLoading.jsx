import { useMemo } from 'react';
import { generateArray } from '../../utils';

const TracksLoading = ({ num }) => {
    const tracks = useMemo(() => generateArray(num), [])

    return (
        <div className='m-2 md:m-4 bg-black/50 border-white/5 rounded-[20px] flex flex-col'>
            <span className="h-[60px] flex items-center gap-4 px-4">
                <span className="w-4"></span>
                <span className="flex-1 max-w-[150px] bg-white/5 rounded-md"></span>
            </span>
            {
                tracks.map((width, index) => (
                    <span key={index} className="h-[50px] border-t border-white/5 px-4 flex items-center gap-4">
                        <span className='w-4 h-4 rounded-full bg-white/5'></span>
                        <span style={{ maxWidth: `${width}px` }} className='h-5 flex-1 rounded-md bg-white/5 max-w-[200px] loading-animation'></span>
                    </span>
                ))
            }
        </div>
    )
};

export default TracksLoading
