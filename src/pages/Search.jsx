import { useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import { SongBar } from "../components/Cards";
import { Loader, Error } from "../components/LoadersAndError";

import { useGetSearchSongsQuery } from "../redux/services/DeezerApi";

const Search = () => {
    const { searchTerm } = useParams()
    const { data, isFetching, error } = useGetSearchSongsQuery( searchTerm )

    if(isFetching) return <Loader title="Loading top charts" />

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Search results for <span className="font-black">{searchTerm}</span></h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.data.map( (song, i) => 
                    <SongBar 
                        key={song.id}
                        song={song}
                        tracks={data.tracks}
                        i={i}
                    />)}
            </div>
        </div>
    )
};

export default Search;
