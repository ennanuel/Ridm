import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Albums, Artists, Songs, Radios } from '../components/List'
import { GenreDetailsHeader } from '../components/Headers'

import { useGetGenreChartsQuery, useGetGenreDetailsQuery, useGetGenreRadiosQuery } from '../redux/services/DeezerApi'
import { useEffect, useState } from 'react'
import { getSingleData } from '../functions/getData'

const GenreDetails = () => {
    const { id } = useParams()
    const [data, setData] = useState({})

    const { blacklist, favorites } = useSelector(state => state.library)

    const { data: genre, isFetching, error } = useGetGenreDetailsQuery(id)
    const { data: charts, isFetching: loading, error: errorLoading } = useGetGenreChartsQuery(id)
    const { data: radios, isFetching: loadingRadios, error: errorLoadingRadios } = useGetGenreRadiosQuery(id)

    useEffect(() => {
        setData(getSingleData({type: 'genres', data: genre, favorites, blacklist}))
    }, [genre, favorites, blacklist])

    return (
        <div className="">
            <GenreDetailsHeader isFetching={isFetching} error={error} genre={data} charts={charts} />
            
            <div className="p-2 md:p-4 mt-4">
                <Songs showmore={true} genreid={id} blacklist={blacklist} favorites={favorites} isFetching={loading} error={errorLoading} songs={charts?.tracks?.data?.slice(0, 6)}>Songs</Songs>
                <Albums showmore={true} genreid={id} blacklist={blacklist} favorites={favorites} isFetching={loading} error={errorLoading} albums={charts?.albums?.data?.slice(0, 10)} showSort={true}>Albums</Albums>
                <Artists showmore={true} genreid={id} blacklist={blacklist} favorites={favorites} isFetching={loading} error={errorLoading} artists={charts?.artists?.data?.slice(0, 10)}>Artists</Artists>
                <Radios showmore={true} genreid={id} blacklist={blacklist} favorites={favorites} isFetching={loadingRadios} error={errorLoadingRadios} radios={radios?.data}>Radios</Radios>
            </div>
        </div>
    )
}

export default GenreDetails