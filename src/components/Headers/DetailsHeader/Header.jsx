import { useMemo } from 'react'

const Header = ({ type, title, text }) => {
    const headerTitle = useMemo(() => title?.length > 25 ? title.substring(0, 25) + '...' : title, [title])

    return (
        <>
        <div className="detail_overlay absolute top-0 left-0 h-full w-full bottom-[-1px]" />
        <div className="flex-row items-end">
            
        </div>
            <p style={{color: text}} className="font-bold text-xs md:text-sm text-gray-400 relative ml-5 md:mb-2 opacity-80">
            { type }
            </p>
        <h2 style={{color: text}} className="text-3xl leading-[2.25rem] md:leading-[4rem] md:text-[4rem] text-white font-bold relative mx-4 md:mb-4 break-words">
            { headerTitle }
        </h2>
        </>
    )
}

export default Header
