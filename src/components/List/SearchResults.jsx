

import { useMemo } from "react";

import { useGetSearchArtistsQuery, useGetSearchAlbumsQuery, useGetSearchSongsQuery } from "../../redux/services/DeezerApi";
import { CATEGORIES } from "../../assets/data/constants";

export default function SearchResults({ search, selectedCategory }) {
    const songSearchQuery = useGetSearchSongsQuery(search);
    const albumSearchQuery = useGetSearchAlbumsQuery(search);
    const artistSearchQuery = useGetSearchArtistsQuery(search);

    const onlyOneCategoryWasSelected = useMemo(() => /(albums|artists|songs)/i.test(selectedCategory), [selectedCategory]);

    const resultsOrderedByCategory = useMemo(() => CATEGORIES.slice(1, ).map((category) => ({ 
        ...category,
        showResult: !onlyOneCategoryWasSelected || category.value === selectedCategory,
        fetchData: category.value === 'albums' ?
            albumSearchQuery : 
            category.value === 'artists' ? 
                artistSearchQuery : 
                category.value === 'songs' ? 
                    songSearchQuery :
                    null
    })), [selectedCategory, onlyOneCategoryWasSelected, albumSearchQuery, artistSearchQuery, songSearchQuery ]);

    return (
        <section className="flex flex-col gap-6">
            {
                resultsOrderedByCategory.map(({ Element, showResult, fetchData, title, value }) => (
                    showResult && Boolean(fetchData.data?.data?.length) ?
                        <Element 
                            songs={value === 'songs' ? (fetchData.data?.data || []) : undefined} 
                            artists={value === 'artists' ? (fetchData.data?.data || []) : undefined} 
                            albums={value === 'albums' ? (fetchData.data?.data || []) : undefined} 
                            isFetching={fetchData.isFetching} 
                            error={fetchData.error}
                        >
                            {
                                !onlyOneCategoryWasSelected ?
                                    <span>
                                                    
                                        <span className="text-gray-400 text-sm md:text-base">{title} results for </span>
                                        <span className="text-gray-100 text-sm md:text-base">{search}</span>
                                    </span> :
                                    null
                            }
                        </Element> :
                        null
                ))
            }
        </section>
    )
}