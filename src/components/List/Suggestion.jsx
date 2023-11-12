import { playNext } from "../../utils/player"
import SuggestedCard from '../Cards/SuggestedCard'
import { Error } from "../LoadersAndError"
import Songs from "./Songs"
import { useMemo } from "react"

const Suggestion = ({ radioTracks, radio, songs, isFetching, error, blacklist, favorites }) => {
    const tracks = useMemo(() => radioTracks?.slice(0, 8), [radioTracks]);

    function addToQueue() {
        playNext({ tracks });
    }

    if (error) return <Error title="Something went wrong" />

    return (
        <div>
            <h3 className="mt-4 text-white text-xl font-bold">Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-6 mt-4">
                <div>
                    <div className="grid gap-2 md:gap-4 grid-cols-5 grid-rows-3">
                        {
                            isFetching ?
                                [1, 1, 1, 1, 1, 1, 1, 1, 1].map((elem, i) => (
                                    <div className={`aspect-square rounded-xl ${(i === 0 || i === 2) && 'col-span-2 row-span-2'} bg-black/50 loading-animation`}></div>
                                )) :
                                <>
                                    <div
                                        onClick={addToQueue}
                                        className="col-span-2 row-span-2 relative rounded-xl overflow-hidden aspect-square flex flex-col justify-center items-center font-bold text-3xl bg-black/50 text-white p-2"
                                    >
                                        <img src={radio?.picture_medium} alt="" className="absolute w-full h-full" />
                                        <p className="relative">Top Mix</p>
                                    </div>
                                    {
                                        tracks?.map(
                                            (song, i) => <SuggestedCard key={i} song={song} i={i} tracks={tracks} />
                                        )
                                    }
                                </>
                        }
                    </div>
                </div>
                <Songs
                    blacklist={blacklist}
                    favorites={favorites}
                    isFetching={isFetching}
                    error={error}
                    songs={songs}
                    full={true}
                    suggestion={true}
                >Popular Songs</Songs>
            </div>
        </div>
    )
};

export default Suggestion
