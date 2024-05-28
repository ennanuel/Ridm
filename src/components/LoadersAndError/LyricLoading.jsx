import { useMemo } from 'react';

const LyricLoading = ({ text, num }) => {
    const lyrics = useMemo(() => {
        if (!num || typeof (num) !== 'number') return [];

        const values = [];

        for (let i = num; i > 0 && values.length <= num; i--) values.push(`${Math.floor(Math.random() * 100)}%`);

        return values;
    }, [])

    return (
        <ul className='flex flex-col md:gap-4 gap-2'>
            {
                lyrics.map((width, index) => <li key={index} style={{ width }} className='bg-white/5 rounded-md h-[25px] loading-animation' />)
            }
        </ul>
    )
}

export default LyricLoading
