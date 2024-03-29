import React from 'react'

const HeaderLoading = () => {
  return (
    <div className='relative z-1 w-full h-full flex flex-col gap-2 md:gap-4 items-start justify-end p-2 md:p-4'>
      <div className="loading-animation w-[60%] md:w-[200px] h-[50px] bg-white/5 rounded-md"></div>
      <div className="flex gap-2 h-[20px] w-[90%] md:w-[300px]">
        <div className="loading-animation flex-1 bg-white/5 rounded-md"></div>
        <div className="loading-animation flex-1 bg-white/5 rounded-md"></div>
      </div>
      <div className="loading-animation h-[20px] w-[70%] md:w-[400px] bg-white/5 rounded-md"></div>
    </div>
  )
}

export default HeaderLoading
