import { useMemo } from "react";

import { SongBar } from "../Cards";
import { SongLoading, Error } from "../LoadersAndError";
import SeeMore from "./SeeMore";

import { getData } from "../../utils/getData";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Songs ({ songs, suggestion, children, isFetching, error, showmore, genreid, noFilter, full, bg }) {
  const library = useSelector(state => state.library);
  const [params] = useSearchParams();

  const tracks = useMemo(() => getData({ type: 'tracks', data: songs, noFilter, sortType: params.get('sort') }), [library, songs, noFilter]);
  const parentClassName = useMemo(() => `relative flex flex-col ${(!full && !suggestion) && 'mb-4'} ${(full && !suggestion) && 'p-3 md:p-4 lg:p-6 rounded-xl overflow-clip'} ${bg ? 'bg-zinc-900 border border-white/5' : ''}`, [full, suggestion, bg]);

  return (
    <div 
      id='tracks' 
      className={parentClassName}
     >
      <Background showBackground={full && bg} backgroundColor={bg} />
      <TitleAndSeeMore children={children} isFetching={isFetching} suggestion={suggestion} showMore={showmore} genreId={genreid} />
      {
        isFetching ?
          <SongLoading num={4} full={full} /> :
          (
            error ?
              <Error title="Could not Fetch songs" /> :
              <div className={`relative z-1 w-full grid grid-cols-1 ${!full && 'md:grid-cols-2'} gap-2 md:gap-4`}>
                {
                  tracks?.map((song, i, tracks) =>
                    <SongBar
                      key={i}
                      song={song} i={i}
                      tracks={tracks}
                    />
                  )
                }
              </div>
          )
      }
    </div>
  )
};

function TitleAndSeeMore({ isFetching, children, showMore, suggestion, genreId }) {
  return (
      <div className={`relative z-1 flex flex-row justify-between items-end ${isFetching ? 'mb-4' : ''} ${suggestion ? 'lg:hidden' : ''}`}>
        {
          children && isFetching ?
            <span className="h-6 rounded-md w-full max-w-[240px] bg-white/5 animation-loading"></span> :
            <h3 className="text-white/80 font-bold text-xl sm:text-2xl mb-6">{children}</h3>
        }
        {
          showMore ?
            <SeeMore link={`/charts?type=songs&genre=${genreId}`} /> :
            null
        }
      </div>
  )
};

function Background({ showBackground, backgroundColor }) {
  if(!showBackground) return;

  return (
    <div style={{ backgroundColor }} className="absolute z-[0] opacity-50 w-full max-w-[400px] h-full min-h-[320px] max-h-[400px] -top-1/2 left-1/2 -translate-x-1/2 rounded-[50%] blur-[64px]" />
  )
};
