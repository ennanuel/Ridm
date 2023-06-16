import React from 'react'

const Header = ({albumData, artistData, songData, artistId}) => {
    return (
        <>
        <div className="detail_overlay absolute top-0 left-0 h-full w-full bottom-[-1px]" />
        <div className="flex-row items-end">
            
        </div>
            <p className="font-bold text-xs md:text-sm text-gray-400 relative ml-5 md:mb-1">
            {
                albumData ? albumData.type :
                songData ? 'track' :
                'artist'
            }
            </p>
        <h2 className="text-3xl md:text-[4em] text-white font-bold md:text-md relative mx-4 mb-2 md:mb-6 break-words">
            {artistId ? artistData?.name : albumData ? albumData?.title : songData?.title }
        </h2>
        </>
    )
}

export default Header
