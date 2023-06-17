import { useGetTopChartTracksQuery } from "../../redux/services/DeezerApi"

import { Songs } from "../List"
import { MoreButton } from "../Buttons"

const SongChart = ({ blacklist, favorites }) => {
  const {data, isFetching, error} = useGetTopChartTracksQuery()

  return (
    <>
    <Songs blacklist={blacklist} favorites={favorites} isFetching={isFetching} error={error} songs={data?.data} />
    <MoreButton />
    </>
  )
}

export default SongChart
