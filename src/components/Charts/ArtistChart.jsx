import { useGetTopChartArtistsQuery } from '../../redux/services/DeezerApi'

import { Artists } from '../List'
import { MoreButton } from "../Buttons"
import { useSearchParams } from 'react-router-dom'

const ArtistChart = ({ blacklist, favorites }) => {
  const [params, getParams] = useSearchParams()
  const {data, isFetching, error} = useGetTopChartArtistsQuery( params.get('genre') || 0 )

  return (
    <>
    <Artists blacklist={blacklist} favorites={favorites} artists={data?.data} isFetching={isFetching} error={error} />
    <MoreButton />
    </>
  )
}

export default ArtistChart
