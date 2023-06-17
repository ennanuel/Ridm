import { useEffect, useState } from "react";

import { SongBar } from "../Cards";
import { SongLoading, Error } from "../LoadersAndError";
import SeeMore from "./SeeMore"

import { getData } from "../../functions/getData";

const Songs = ({ songs, children, isFetching, error, blacklist, favorites, showmore, genreid }) => {
  const [tracks, setTracks] = useState([])

  useEffect(() => {
    setTracks(getData({type: 'tracks', data: songs, favorites, blacklist}))
  }, [favorites, blacklist, songs])

  return (
    <div className="flex flex-col mb-8">
      <div className="flex flex-row justify-between items-center mb-4">
          <h3 className="text-white font-bold text-xl">{children}</h3>
          {
            showmore && <SeeMore link={`/charts?type=songs&genre=${genreid}`} />
          }
      </div>

      {
        isFetching ?
        <SongLoading num={4} /> :
        (
          error ?
          <Error title="Could not Fetch songs" /> :
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2">
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
