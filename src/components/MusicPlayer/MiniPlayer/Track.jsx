import React from 'react';

const Track = ({ isPlaying, isActive, activeSong }) => (
  <div className="flex-1 flex items-center justify-start">
    <div className={`${isPlaying && isActive ? 'md:animate-[spin_3s_linear_infinite]' : ''} sm:block h-[35px] w-[35px] md:h-[40px] md:w-[40px] mr-2`}>
      <img src={activeSong?.album?.cover_small} alt="" className="md:rounded-full w-full h-full rounded-md bg-white/5" />
    </div>
    <div className="flex-1 max-w-[250px]">
      <p className="truncate text-white font-semibold text-[0.65em] sm:text-md">
        {activeSong?.title ? activeSong?.title : 'No active Song'}
      </p>
      <p className="truncate text-gray-300 text-[0.6em] sm:text-xs">
        {activeSong?.artist?.name ? activeSong?.artist?.name : 'No active Song'}
      </p>
    </div>
  </div>
);

export default Track;
