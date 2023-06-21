import { useGetTopChartAlbumsQuery } from '../../redux/services/DeezerApi'

import { Albums } from '../List'
import { MoreButton } from '../Buttons'
import { useSearchParams } from 'react-router-dom'
import { useState } from 'react'

const AlbumChart = ({ blacklist, favorites }) => {
  const [limit, setLimit] = useState(true)
  const [params, setParams] = useSearchParams()
  const {data, isFetching, error} = useGetTopChartAlbumsQuery( params.get('genre') )

  return (
    <>
    <Albums isFetching={isFetching} error={error} albums={data?.data?.slice(0, limit ? 20 : 50)} blacklist={blacklist} favorites={favorites} />
    <MoreButton limit={limit} setLimit={setLimit} />
    </>
  )
}

export default AlbumChart
