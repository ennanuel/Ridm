import React from 'react'

const Card = ({ show, radio }) => {
  return (
    <div className="flex flex-col gap-3">
      <img className={`shadow shadow-black/50 ${show && 'w-[150px]'} aspect-square`} src={radio.picture_medium} alt="" />
      <p className="flex flex-col font-bold">
        <span className="text-xs text-gray-400">{radio.type}</span>
        <span className="text-white truncate font-semibold">{radio.title}</span>
      </p>
    </div>
  )
}

export default Card
