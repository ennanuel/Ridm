import { useGetTopChartTracksQuery } from "../../redux/services/DeezerApi"

import { Songs } from "../List"
import { MoreButton } from "../Buttons"
import { useSearchParams } from "react-router-dom"

const SongChart = ({ blacklist, favorites }) => {
  const [params, getParams] = useSearchParams()
  const {data, isFetching, error} = useGetTopChartTracksQuery( params.get('genre') || 0 )

  return (
    <>
    <Songs blacklist={blacklist} favorites={favorites} isFetching={isFetching} error={error} songs={data?.data} />
    <MoreButton />
    </>
  )
}

export default SongChart
