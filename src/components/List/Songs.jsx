import { useEffect, useMemo, useState } from "react";

import { SongBar } from "../Cards";
import { SongLoading, Error } from "../LoadersAndError";
import SeeMore from "./SeeMore"

import { getData } from "../../utils/getData";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Songs = ({ songs, suggestion, children, isFetching, error, showmore, genreid, noFilter, full, bg, bg2 }) => {
  const library = useSelector(state => state.library);
  const [tracks, setTracks] = useState([]);
  const [params, setParams] = useSearchParams();
  const style = useMemo(() => ({ background: (full && bg) && `linear-gradient(${bg.replace(')', ',0.5)')}, ${bg2.replace(')', ',0.5)')})` }), [bg, bg2, full, songs])

  useEffect(() => {
    const sortType = params.get('sort');
    const songsData = getData({ type: 'tracks', data: songs, noFilter, sortType })
    setTracks(songsData);
  }, [library, songs, noFilter])

  return (
    <div style={style} className={`flex flex-col ${(!full && !suggestion) && 'mb-8'} ${(full && !suggestion) && 'p-3 rounded-md overflow-clip'}`}>
      <div className={`relative z-1 flex flex-row justify-between items-end mb-4 ${suggestion ? 'lg:hidden' : ''}`}>
          <h3 className="text-white/80 font-bold text-xl">{children}</h3>
          {
            showmore && <SeeMore link={`/charts?type=songs&genre=${genreid}`} />
          }
      </div>

      {
        isFetching ?
        <SongLoading num={4} full={full} /> :
        (
          error ?
          <Error title="Could not Fetch songs" /> :
            <div className={`relative z-1 w-full grid grid-cols-1 ${!full && 'md:grid-cols-2'} gap-2`}>
            {
              tracks?.map( (song, i, tracks) =>
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
