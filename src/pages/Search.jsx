
import { useEffect, useMemo } from "react";

import { useParams, useSearchParams } from "react-router-dom";

import { SearchResults, SearchCategories } from "../components/List";

export default function Search () {
    const { searchTerm } = useParams()

    const [params, setParams] = useSearchParams();
    const selectedCateogry = useMemo(() => params.get('category'), [params]);

    function selectCategory(category) {
        setParams({ category });
    }

    useEffect(() => {
        const text = `Search results for - ${searchTerm}`
        document.getElementById('site_title').innerText = text
    }, [searchTerm])

    return (
        <div className="flex flex-col px-2 md:px-4 gap-6">
            <SearchCategories selectCategory={selectCategory} selectedCategory={selectedCateogry} />
            <SearchResults search={searchTerm} selectedCategory={selectedCateogry} />
        </div>
    )
};