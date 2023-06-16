import { useGetTopChartArtistsQuery } from '../../redux/services/DeezerApi'

import { Artists } from '../List'

const ArtistChart = () => {
  const {data, isFetching, error} = useGetTopChartArtistsQuery()

  return (
    <Artists artists={data?.data || []} isFetching={isFetching} error={error} />
  )
}

export default ArtistChart
