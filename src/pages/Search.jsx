import { useSelector } from "react-redux";

import { useParams, useSearchParams } from "react-router-dom";

import { Loader, Error } from "../components/LoadersAndError";

import { useGetSearchArtistsQuery, useGetSearchAlbumsQuery, useGetSearchSongsQuery } from "../redux/services/DeezerApi";
import { Artists, Songs, Albums } from "../components/List";

const Search = () => {
    const categories = ['All', 'Song', 'Artist', 'Album']
    const { searchTerm } = useParams()

    const [params, setParams] = useSearchParams()

    const { blacklist, favorites } = useSelector(state => state.library)
    const { data: songSearch, isFetching: isFetchingSong, error: errorFetchingSong } = useGetSearchSongsQuery( searchTerm )
    const { data: albumSearch, isFetching: isFetchingAlbum, error: errorFetchingAlbum } = useGetSearchAlbumsQuery( searchTerm )
    const { data: artistSearch, isFetching: isFetchingArtist, error: errorFetchingArtist } = useGetSearchArtistsQuery( searchTerm )

    return (
        <div className="flex flex-col p-2 md:p-4 mt-[60px]">
            <ul className="flex flex-row items-center justify-center overflow-x-scroll overflow-y-clip gap-2 text-gray-300 font-bold">
                {
                    categories.map( (category, i) => (
                        <li 
                            key={i} 
                            className={`rounded-md px-2 py-1 text-sm sm:text-md hover:text-gray-100 border border-white/10 ${params.get('cat') == category || (!['Song', 'Artist', 'Album'].includes(params.get('cat')) && category == 'All') ? 'bg-white/40 text-white' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                            <button onClick={() => setParams({'cat': category})}>{category}</button>
                        </li>
                    ))
                }
            </ul>
            {
                (params.get('cat') != 'Artist' && params.get('cat') != 'Album') &&
                <Songs songs={songSearch?.data || []} isFetchihng={isFetchingSong} error={errorFetchingSong} blacklist={blacklist} favorites={favorites}>
                    <span className="text-gray-400">Song results for </span><span className="text-gray-100">{searchTerm}</span>
                </Songs>
            }
            {
                (params.get('cat') != 'Artist' && params.get('cat') != 'Song') &&
                <Albums albums={albumSearch?.data || []} isFetching={isFetchingAlbum} error={errorFetchingAlbum} blacklist={blacklist} favorites={favorites}>
                    <span className="text-gray-400">Album results for </span><span className="text-gray-100">{searchTerm}</span>
                </Albums>
            }
            {
                (params.get('cat') != 'Song' && params.get('cat') != 'Album') &&
                <Artists artists={artistSearch?.data || []} isFetching={isFetchingArtist} error={errorFetchingArtist} blacklist={blacklist} favorites={favorites}>
                    <span className="text-gray-400">Artist results for </span><span className="text-gray-100">{searchTerm}</span>
                </Artists>
            }
        </div>
    )
};

export default Search;
