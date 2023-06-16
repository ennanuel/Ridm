import React from 'react'

const ChartCard = ({ active, type, category, i, handleClick }) => {
    const origin = i === 0 ? 'origin-top-left' : i === 1 ? 'origin-top-right' : i === 2 ? 'origin-bottom-left' : i === 3 ? 'origin-bottom-right' : ''

    return (
        <div 
            style={{'--delay': i/10 + 's'}}
            className={`overflow-hidden border-2 px-4 py-2 h-full rounded-xl flex items-end justify-end bg-black/50 transition-[opacity,transform] duration-300 ${active ? 'opacity-0 scale-[2] border-transparent' : 'border-white/10'} ${origin}`} 
            onClick={() => ((type === null || type === '') || !active) && handleClick(category.to)}
        >
            <div className="cat-text transition-transform overflow-hidden text-white text-2xl md:text-[3em] font-bold capitalize z-[1]">
                <p className={`md:mb-4 w-fit transition-transform duration-500 ${active ? 'translate-y-[100%]' : 'translate-y-[0] delay-200'}`}>{category.name}</p>
            </div>
        </div>
    )
}

export default ChartCard
