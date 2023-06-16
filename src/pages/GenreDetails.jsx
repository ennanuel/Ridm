import { useParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { Albums, Artists, Songs, Radios } from '../components/List'
import { GenreDetailsHeader } from '../components/Headers'

import { useGetGenreChartsQuery, useGetGenreDetailsQuery, useGetGenreRadiosQuery } from '../redux/services/DeezerApi'

const GenreDetails = () => {
    const { id } = useParams()

    const { data, isFetching, error } = useGetGenreDetailsQuery(id)
    const { data: charts, isFetching: loading, error: errorLoading } = useGetGenreChartsQuery(id)
    const { data: radios, isFetching: loadingRadios, error: errorLoadingRadios } = useGetGenreRadiosQuery(id)

    return (
        <div className="">
            <GenreDetailsHeader isFetching={isFetching} error={error} genre={data} charts={charts} />
            
            <Songs isFetching={loading} error={errorLoading} songs={charts?.tracks?.data?.slice(0, 6)}>Songs</Songs>
            <Albums isFetching={loading} error={errorLoading} albums={charts?.albums?.data?.slice(0, 10)} showSort={true}>Albums</Albums>
            <Artists isFetching={loading} error={errorLoading} artists={charts?.artists?.data?.slice(0, 10)}>Artists</Artists>
            <Radios isFetching={loadingRadios} error={errorLoadingRadios} radios={radios?.data}>Radios</Radios>
        </div>
    )
}

export default GenreDetails