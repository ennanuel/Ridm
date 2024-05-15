import React from 'react'

const MoreButton = ({ setLimit, limit, length }) => {
  return (
    (limit && length > 20) &&
    <div className="w-full flex justify-center my-[50px]">
      <button onClick={() => setLimit(false)} className="flex items-center justify-center text-xs md:text-sm text-black bg-gray-200 border border-gray-200 rounded-[16px] h-[28px] md:h-[32px] font-semibold px-3 md:px-4 m-auto transition-[background-color] hover:bg-transparent hover:text-gray-200">
        See more
      </button>
    </div>
  )
}

export default MoreButton
