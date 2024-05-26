import { useGetTopChartTracksQuery } from "../../redux/services/DeezerApi"

import { useState } from "react"

import { Songs } from "../List"
import { MoreButton } from "../Buttons"
import { useSearchParams } from "react-router-dom"

const SongChart = () => {
  const [limit, setLimit] = useState(true)
  const [params, getParams] = useSearchParams()
  const {data, isFetching, error} = useGetTopChartTracksQuery( params.get('genre') || 0 )

  return (
    <>
    <Songs isFetching={isFetching} error={error} songs={data?.data?.slice(0, limit ? 20 : 50)} />
    <MoreButton limit={limit} setLimit={setLimit} length={data?.data?.length} />
    </>
  )
}

export default SongChart
