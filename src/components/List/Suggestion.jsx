import { SongBar } from "../Cards"
import { playNext } from "../../functions/player"
import SuggestedCard from '../Cards/SuggestedCard'
import { Link } from "react-router-dom"
import SeeMore from "./SeeMore"

const Suggestion = ({ radioTracks, radio, dispatch, songs }) => {
    return ( 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="mt-5 text-white text-xl font-bold">Suggestions</h3>
                <div className="grid gap-2 md:gap-4 grid-cols-5 grid-rows-3 my-4">
                    <div onClick={() => playNext({dispatch, tracks: radioTracks?.slice(0, 8)})} className="col-span-2 row-span-2 relative rounded-xl overflow-hidden aspect-square flex flex-col justify-center items-center font-bold text-3xl bg-red-950 text-white p-2">
                        <img src={radio?.picture_medium} alt="" className="absolute w-full h-full" />
                        <p className="relative">Top Mix</p>
                    </div>
                    {
                        radioTracks?.slice(0, 8)?.map(
                            (song, i, tracks) => <SuggestedCard dispatch={dispatch} key={i} song={song} i={i} tracks={tracks} />
                        )
                    }
                </div>
            </div>
            <div>
                <div className="flex justify-between items-end mb-4 ">
                    <h3 className="text-white text-xl font-bold md:hidden">Popular songs</h3>
                    <SeeMore link="/charts?type=songs" />
                </div>
                <div className="grid grid-row-5 gap-2">
                    {
                        songs?.slice(0, 5)?.map( (song, i, songs) => 
                            <SongBar song={song} i={i} tracks={songs} />
                        )
                    }
                </div>
            </div>
        </div>
  )
}

export default Suggestion
