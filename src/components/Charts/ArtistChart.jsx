import { useGetTopChartArtistsQuery } from '../../redux/services/DeezerApi'

import { Artists } from '../List'
import { MoreButton } from "../Buttons"

const ArtistChart = ({ blacklist, favorites }) => {
  const {data, isFetching, error} = useGetTopChartArtistsQuery()

  return (
    <>
    <Artists blacklist={blacklist} favorites={favorites} artists={data?.data} isFetching={isFetching} error={error} />
    <MoreButton />
    </>
  )
}

export default ArtistChart
