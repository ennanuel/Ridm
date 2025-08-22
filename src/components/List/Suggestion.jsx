
import { useMemo, useState } from "react";

import { HiOutlineQueueList, HiQueueList } from "react-icons/hi2";
import SuggestedCard from '../Cards/SuggestedCard';
import { Error } from "../LoadersAndError";
import Songs from "./Songs";

import { playNext } from "../../utils/player";
import { editorialImage, logo, logo1 } from "../../assets/images";


const MOCK_RADIO_SONGS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export default function Suggestion ({ radioTracks, songs, isFetching, error, blacklist, favorites }) {
    const tracks = useMemo(() => radioTracks?.slice(0, 10), [radioTracks]);

    function addToQueue() {
        playNext({ tracks });
    }

    if (error) return <Error title="Something went wrong" />

    return (
        <div>
            <h3 className="mt-4 text-white text-xl font-bold">Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 lg:gap-6 mt-4">
                <Editorials loading={isFetching} addToQueue={addToQueue} tracks={tracks} />
                <Songs
                    blacklist={blacklist}
                    favorites={favorites}
                    isFetching={isFetching}
                    error={error}
                    songs={songs}
                    full={true}
                    suggestion={true}
                />
            </div>
        </div>
    )
};

function Editorials({ loading, addToQueue, tracks }) {

    if(loading) return (
        <LoadingEditorials />
    );

    else return (
        <div className="grid gap-1 md:gap-3 grid-cols-5">
            <EditorialImage addToQueue={addToQueue} />
            <EditorialTracks tracks={tracks} />
        </div>
    );
};

function LoadingEditorials() {
    
    return (
        <div className="grid gap-1 md:gap-2 grid-cols-5">
            {
                MOCK_RADIO_SONGS.map((item, index) => (
                    <span 
                        key={item} 
                        className={`${([0, 2, 6].includes(index)) ? 'col-span-2 row-span-2' : 'w-full col-span-1 row-span-1 aspect-square'} rounded-xl bg-black/50 loading-animation`} 
                    />
                ))
            }
        </div>
    )
};

function EditorialTracks({ tracks }) {
    return tracks?.map(
        (song, index) => <SuggestedCard key={index} song={song} index={index} tracks={tracks} />
    )
};

function EditorialImage({ addToQueue }) {
    const [songsAreAdded, setSongsAreAdded] = useState(false);

    const handleEditorialClick = () => {
        setSongsAreAdded(true);
        addToQueue();
    };

    const handleMouseOut = () => {
        setSongsAreAdded(false);
    }

    return (
        <button
            onClick={handleEditorialClick}
            onMouseOut={handleMouseOut}
            title="Add songs to queue"
            className="group col-span-2 row-span-2 relative rounded-xl overflow-clip flex flex-col justify-center items-center font-bold text-3xl bg-gray-400"
        >
            <img src={editorialImage} alt="Editorial image" loading="lazy" className="group-hover:blur absolute w-full h-full object-fit" />
            <img src={logo1} alt="Ridm logo" className="absolute top-2 right-2 w-6 h-auto object-contain" />
            {
                songsAreAdded ?
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-1 items-center justify-center bg-zinc-100 text-zinc-900 md:opacity-0 group-hover:opacity-100">
                        <img src={logo1} alt="Ridm logo" className="absolute top-2 right-2 w-6 h-auto object-contain" />
                        <HiQueueList size={40} />
                        <span className="font-semibold text-sm">Songs added to queue!</span>
                    </div> : 
                    <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-1 items-center justify-center bg-black/60 text-white md:opacity-0 group-hover:opacity-100">
                        <img src={logo} alt="Ridm logo" className="absolute top-2 right-2 w-6 h-auto object-contain" />
                            <HiOutlineQueueList size={40} />
                            <span className="font-semibold text-sm">Add songs to queue</span> 
                    </div>

            }
        </button>
    )
};