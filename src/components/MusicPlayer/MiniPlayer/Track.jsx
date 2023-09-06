import React from 'react';

const Track = ({ isPlaying, isActive, activeSong, imageRef, onLoad }) => (
  <div className="flex-1 flex items-center justify-start relative">
    <div className="absolute top-0 left-0 w-full h-full"></div>
    <div className={`${isPlaying && isActive ? 'md:animate-[spin_3s_linear_infinite]' : ''} sm:block h-[35px] w-[35px] md:h-[40px] md:w-[40px] mr-2`}>
      <img ref={imageRef} crossOrigin='anonymous' onLoad={onLoad} src={activeSong?.album?.cover_small} alt="" className="md:rounded-full w-full h-full rounded-md bg-white/5" />
    </div>
    <div className="flex-1 max-w-[250px]">
      <p className="truncate text-gray-200 font-bold text-[0.7rem] sm:text-base">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-400 font-semibold opacity-80 text-[0.65rem] sm:text-xs">
        {activeSong?.artist?.name ? activeSong?.artist?.name : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
