import React from 'react'

const Card = ({ show, radio }) => {
  return (
    <div>
      <img className={`shadow-lg shadow-black/50 ${show && 'w-[150px]'}`} src={radio.picture_medium} alt="" />
      <p className="flex flex-col gap-1 mt-2 font-bold mx-2">
        <span className="text-xs text-gray-400">{radio.type}</span>
        <span className="text-white truncate font-semibold">{radio.title}</span>
      </p>
    </div>
  )
}

export default Card
