import { SongBar } from "../Cards";
import { SongLoading, Error } from "../LoadersAndError";

const Songs = ({ songs, children, isFetching, error }) => (
  <div className="flex flex-col">
    <h1 className="font-bold mx-4 text-lg md:text-xl text-white">{children}</h1>

    {
      isFetching ?
      <SongLoading num={4} /> :
      (
        error ?
        <Error title="Could not Fetch songs" /> :
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 overflow-x-clip">
          {
            songs?.map( (song, i, tracks) =>
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
);

export default Songs;
