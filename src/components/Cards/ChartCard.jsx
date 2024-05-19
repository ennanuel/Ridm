import React from 'react'

const ChartCard = ({ active, type, category, i, handleClick }) => {
    const origin = i === 0 ? 'origin-top-left' : i === 1 ? 'origin-top-right' : i === 2 ? 'origin-bottom-left' : i === 3 ? 'origin-bottom-right' : ''

    return (
        <div 
            style={{'--delay': i/10 + 's'}}
            className={`group relative overflow-hidden border-2 px-4 py-2 h-full cursor-pointer rounded-[20px] flex flex-col items-end justify-end bg-white/5 hover:bg-black/30 transition-[opacity,transform] duration-300 border-transparent ${active ? 'opacity-0 scale-[2] border-transparent' : 'hover:border-white/5 shaodw-lg shadow-black/30'} ${origin}`} 
            onClick={() => ((type === null || type === '') || !active) && handleClick(category.to)}
        >
            {/* {!active && <img src={category.image} className="absolute top-0 left-[-5px] w-full h-full scale-[1.1] transition-[transform,opacity] group-hover:opacity-10 group-hover:scale-[1.2] object-cover opacity-50" alt={category.name} />} */}
            <div className="relative group-hover:translate-y-[0px] translate-y-[30px] transition-transform cat-text overflow-hidden z-[1] text-right">
                <p className={`md:mb-4 w-fit transition-transform duration-500 text-white text-2xl md:text-[3em] font-bold capitalize ${active ? 'translate-y-[100%]' : 'translate-y-[0] delay-200'}`}>{category.name}</p>
            </div>
            <div className='relative overflow-hidden'>
                <p className="text-gray-400 group-hover:translate-y-[0] transition-transform text-sm translate-y-[110%]">{category.desc}</p>
            </div>
        </div>
    )
}

export default ChartCard
