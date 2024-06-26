import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Albums, Artists, Songs, Radios } from '../components/List'
import { GenreDetailsHeader } from '../components/Headers'

import { useGetGenreChartsQuery, useGetGenreDetailsQuery, useGetGenreRadiosQuery } from '../redux/services/DeezerApi'
import { useEffect, useMemo, useState } from 'react'
import { getSingleData } from '../utils/getData'

const GenreDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState({});
    const [[bg, text], setColors] = useState(['', '']);

    const style = useMemo(() => ({ background: `linear-gradient(${bg.replace(')', ', 0.5)')}, transparent 80vh)`}), [bg, text]);

    const { blacklist, favorites } = useSelector(state => state.library);

    const { data: genre, isFetching, error } = useGetGenreDetailsQuery(id);
    const { data: charts, isFetching: loading, error: errorLoading } = useGetGenreChartsQuery(id);
    const { data: radios, isFetching: loadingRadios, error: errorLoadingRadios } = useGetGenreRadiosQuery(id);


    useEffect(() => {
        setData(getSingleData({ type: 'genres', data: genre }));
    }, [genre, favorites, blacklist])

    useEffect(() => {
        const text = `Ridm Genre - ${isFetching ? 'Loading...' : error ? 'Could not fetch details' : genre?.name}`;
        document.getElementById('site_title').innerText = text;
    }, [genre])

    return (
        <div className="flex flex-col px-2">
            <GenreDetailsHeader isFetching={isFetching} error={error} genre={data} charts={charts} setColors={setColors} bg={bg} text={text} />
            <div style={style} className="p-2 md:p-4 pt-6 md:pt-[30px] mt-2 backdrop-blur-xl rounded-[15px]">
                <Songs showmore={true} genreid={id} isFetching={loading} error={errorLoading} songs={charts?.tracks?.data?.slice(0, 6)}>Songs</Songs>
                <Albums showmore={true} genreid={id} isFetching={loading} error={errorLoading} albums={charts?.albums?.data?.slice(0, 10)} showSort={true}>Albums</Albums>
                <Artists showmore={true} genreid={id} isFetching={loading} error={errorLoading} artists={charts?.artists?.data?.slice(0, 10)}>Artists</Artists>
                <Radios showmore={true} genreid={id} isFetching={loadingRadios} error={errorLoadingRadios} radios={radios?.data}>Radios</Radios>
            </div>
        </div>
    )
}

export default GenreDetails