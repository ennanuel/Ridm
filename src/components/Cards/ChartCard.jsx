import React, { useMemo } from 'react';

const getCardBackground = (categoryType) => (
    categoryType === 'artists' ?
        'from-blue-600 to-purple-600' :
        categoryType === 'songs' ?
            'from-blue-900 to-green-600' :
            categoryType === 'albums' ?
                'from-purple-900 to-pink-600' :
                'from-red-900 to-yellow-600'
);

const ChartCard = ({ active, type, category, i, handleClick }) => {
    const origin = useMemo(() => i === 0 ? 'origin-top-left' : i === 1 ? 'origin-top-right' : i === 2 ? 'origin-bottom-left' : i === 3 ? 'origin-bottom-right' : '', []);
    const background = useMemo(() => getCardBackground(category.to), []);

    return (
        <div 
            style={{'--delay': i/10 + 's'}}
            className={`group relative overflow-hidden border-2 px-4 py-2 h-full cursor-pointer rounded-[20px] flex flex-col items-end justify-end bg-white/5 transition-[opacity,transform] hover:bg-transparent duration-300 border-transparent ${active ? 'opacity-0 scale-[2] border-transparent' : 'hover:border-white/5'} ${origin}`} 
            onClick={() => ((type === null || type === '') || !active) && handleClick(category.to)}
        >
            {
                !active &&
                <div className={`absolute bottom-0 right-0 w-full max-w-[200px] bg-gradient-to-br from-white/50 to-black/50 ${background} blur-[30px] rounded-full aspect-square translate-y-[50%] translate-x-[30%] transition-[transform,opacity] group-hover:scale-[3] group-hover:opacity-100 group-hover:rotate-180 duration-300 object-cover opacity-50`} />
            }
            <div className="relative group-hover:translate-y-0 md:translate-y-[30px] transition-transform cat-text overflow-hidden z-[1] text-right">
                <p className={`md:mb-4 w-fit transition-transform duration-500 text-white text-2xl md:text-[3em] font-bold capitalize ${active ? 'translate-y-[100%]' : 'translate-y-[0] delay-200'}`}>{category.name}</p>
            </div>
            <div className='relative overflow-hidden hidden md:block'>
                <p className="text-gray-200 text-right group-hover:translate-y-[0] transition-transform text-sm translate-y-[110%]">{category.desc}</p>
            </div>
        </div>
    )
}

export default ChartCard
