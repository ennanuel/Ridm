import { SongBar } from "../Cards"
import { playNext } from "../../functions/player"
import SuggestedCard from '../Cards/SuggestedCard'
import SeeMore from "./SeeMore"
import { SongLoading, Error } from "../LoadersAndError"

const Suggestion = ({ radioTracks, radio, dispatch, songs, isFetching, error }) => {

    if(error) return <Error title="Something went wrong" />

    return ( 
        <>
        {!isFetching && <h3 className="mt-5 text-white text-xl font-bold">Suggestions</h3>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
            <div>
                <div className="grid gap-2 md:gap-4 grid-cols-5 grid-rows-3">
                    {
                        isFetching ?
                        [1, 1, 1, 1, 1, 1, 1, 1, 1].map( (elem, i) => (
                            <div className={`aspect-square rounded-xl ${(i === 0 || i === 2) && 'col-span-2 row-span-2'} bg-black/50 loading-animation`}></div>
                        )) :
                        <>
                        <div onClick={() => playNext({dispatch, tracks: radioTracks?.slice(0, 8)})} className="col-span-2 row-span-2 relative rounded-xl overflow-hidden aspect-square flex flex-col justify-center items-center font-bold text-3xl bg-black/50 text-white p-2">
                            <img src={radio?.picture_medium} alt="" className="absolute w-full h-full" />
                            <p className="relative">Top Mix</p>
                        </div>
                        {
                            radioTracks?.slice(0, 8)?.map(
                                (song, i, tracks) => <SuggestedCard dispatch={dispatch} key={i} song={song} i={i} tracks={tracks} />
                            )
                        }
                        </>
                    }
                </div>
            </div>
            <div>
                <div className="flex justify-between items-end mb-4 md:hidden">
                    <h3 className="text-white text-xl font-bold">Popular songs</h3>
                    <SeeMore link="/charts?type=songs" />
                </div>
                <div className="grid grid-row-5 gap-2">
                    {
                        isFetching ?
                        <SongLoading num={5} /> :
                        songs?.slice(0, 5)?.map( (song, i, songs) => 
                            <SongBar key={i} song={song} i={i} tracks={songs} />
                        )
                    }
                </div>
            </div>
        </div>
    </>
  )
}

export default Suggestion
