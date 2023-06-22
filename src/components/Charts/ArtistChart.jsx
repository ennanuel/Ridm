import { useGetTopChartArtistsQuery } from '../../redux/services/DeezerApi'

import { Artists } from '../List'
import { MoreButton } from "../Buttons"
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const ArtistChart = ({ blacklist, favorites }) => {
  const [params, getParams] = useSearchParams()
  const [limit, setLimit] = useState(true)
  const {data, isFetching, error} = useGetTopChartArtistsQuery( params.get('genre') || 0 )

  return (
    <>
    <Artists blacklist={blacklist} favorites={favorites} artists={data?.data?.slice(0, limit ? 20 : 50)} isFetching={isFetching} error={error} />
    <MoreButton limit={limit} setLimit={setLimit} length={data?.data?.length} />
    </>
  )
}

export default ArtistChart
