import { useGetTopChartTracksQuery } from "../../redux/services/DeezerApi"

import { Songs } from "../List"

const SongChart = () => {
  const {data, isFetching, error} = useGetTopChartTracksQuery()

  return (
    <Songs isFetching={isFetching} error={error} songs={data?.data || []} />
  )
}

export default SongChart
