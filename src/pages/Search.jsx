import { useSelector } from "react-redux";

import { useParams, useSearchParams } from "react-router-dom";

import { useGetSearchArtistsQuery, useGetSearchAlbumsQuery, useGetSearchSongsQuery } from "../redux/services/DeezerApi";
import { Artists, Songs, Albums } from "../components/List";
import { useEffect } from "react";

const categories = ['All', 'Song', 'Artist', 'Album'];

const Search = () => {
    const { searchTerm } = useParams()

    const [params, setParams] = useSearchParams()

    const { blacklist, favorites } = useSelector(state => state.library)
    const { data: songSearch, isFetching: isFetchingSong, error: errorFetchingSong } = useGetSearchSongsQuery( searchTerm )
    const { data: albumSearch, isFetching: isFetchingAlbum, error: errorFetchingAlbum } = useGetSearchAlbumsQuery( searchTerm )
    const { data: artistSearch, isFetching: isFetchingArtist, error: errorFetchingArtist } = useGetSearchArtistsQuery( searchTerm )

    useEffect(() => {
        const text = `Search results for - ${searchTerm}`
        document.getElementById('site_title').innerText = text
    }, [searchTerm])

    return (
        <div className="flex flex-col px-2 md:px-4 gap-6">
            <ul className="flex flex-row items-center justify-center lg:justify-start overflow-x-auto overflow-y-clip gap-2 text-gray-300 font-bold">
                {
                    categories.map((category, i) => (
                        <li
                            key={i}
                            className={`rounded-[18px] flex items-center justify-center px-2 md:px-3 h-[28px] min-w-[60px] md:h-[32px] text-xs sm:text-sm hover:text-gray-100 border border-white/10 ${params.get('cat') == category || (!['Song', 'Artist', 'Album'].includes(params.get('cat')) && category == 'All') ? 'bg-white text-black' : 'bg-white/5 hover:bg-white/10'}`}
                        >
                            <button onClick={() => setParams({ 'cat': category })}>{category}</button>
                        </li>
                    ))
                }
            </ul>
            {
                (params.get('cat') != 'Artist' && params.get('cat') != 'Album') &&
                <Songs songs={songSearch?.data || []} isFetching={isFetchingSong} error={errorFetchingSong} blacklist={blacklist} favorites={favorites}>
                    {
                        !/(song|artist|album)/i.test(params.get('cat')) ?
                            <span>
                                            
                                <span className="text-gray-400 text-sm md:text-base">Song results for </span>
                                <span className="text-gray-100 text-sm md:text-base">{searchTerm}</span>
                            </span> :
                            null
                    }
                </Songs>
            }
            {
                (params.get('cat') != 'Artist' && params.get('cat') != 'Song') &&
                <Albums albums={albumSearch?.data || []} isFetching={isFetchingAlbum} error={errorFetchingAlbum} blacklist={blacklist} favorites={favorites}>
                    {
                        !/(song|artist|album)/i.test(params.get('cat')) ?
                            <span>
                                <span className="text-gray-400 text-sm md:text-base">Album results for </span>
                                <span className="text-gray-100 text-sm md:text-base">{searchTerm}</span>
                            </span> :
                            null
                    }
                </Albums>
            }
            {
                (params.get('cat') != 'Song' && params.get('cat') != 'Album') &&
                <Artists artists={artistSearch?.data || []} isFetching={isFetchingArtist} error={errorFetchingArtist} blacklist={blacklist} favorites={favorites}>
                    {
                        !/(song|artist|album)/i.test(params.get('cat')) ?
                            <span>
                                    
                                <span className="text-gray-400 text-sm md:text-base">Artist results for </span>
                                <span className="text-gray-100 text-sm md:text-base">{searchTerm}</span>
                            </span> :
                            null
                    }
                </Artists>
            }
        </div>
    )
};

export default Search;
