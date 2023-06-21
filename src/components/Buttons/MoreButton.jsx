import React from 'react'

const MoreButton = ({ setLimit, limit, length }) => {
  return (
    (limit && length > 20) &&
    <div className="w-full flex justify-center my-[50px]">
      <button onClick={() => setLimit(false)} className="text-gray-300 border-2 border-gray-300 rounded-md font-semibold px-3 py-1 m-auto transition-[background-color] hover:bg-gray-300 hover:text-black">
          See more
      </button>
    </div>
  )
}

export default MoreButton
