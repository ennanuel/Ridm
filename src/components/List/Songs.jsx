import { useMemo } from "react";

import { SongBar } from "../Cards";
import { SongLoading, Error } from "../LoadersAndError";
import SeeMore from "./SeeMore"

import { getData } from "../../utils/getData";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Songs = ({ songs, suggestion, children, isFetching, error, showmore, genreid, noFilter, full, bg, bg2 }) => {
  const library = useSelector(state => state.library);
  const [params, setParams] = useSearchParams();

  const tracks = useMemo(() => getData({ type: 'tracks', data: songs, noFilter, sortType: params.get('sort') }), [library, songs, noFilter]);

  const style = useMemo(() => ({
    background: (full && bg) && `linear-gradient(${bg.replace(')', ',0.5)')}, ${bg2.replace(')', ',0.5)')})`
  }), [bg, bg2, full, songs]);

  return (
    <div id='tracks' style={style} className={`flex flex-col ${(!full && !suggestion) && 'mb-4'} ${(full && !suggestion) && 'p-3 rounded-[20px] overflow-clip'}`}>
      <div className={`relative z-1 flex flex-row justify-between items-end ${isFetching && 'mb-4'} ${suggestion ? 'lg:hidden' : ''}`}>
        {
          children && isFetching ?
            <span className="h-6 rounded-md w-full max-w-[240px] bg-white/5 animation-loading"></span> :
            <h3 className="text-white/80 font-bold text-xl mb-6">{children}</h3>
        }
        {
          showmore &&
          <SeeMore link={`/charts?type=songs&genre=${genreid}`} />
        }
      </div>
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

export default Songs;
