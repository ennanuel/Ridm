import { useMemo } from 'react';
import { generateArray } from '../../utils';

const LyricLoading = ({ num }) => {
    const lyrics = useMemo(() => generateArray(num), [])

    return (
        <div className='flex flex-col md:gap-4 gap-2'>
            {
                lyrics.map((width, index) => <span key={index} style={{ width }} className='block bg-white/5 rounded-full h-6 loading-animation' />)
            }
        </div>
    )
}

export default LyricLoading
