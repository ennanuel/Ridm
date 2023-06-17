import { useGetTopChartAlbumsQuery } from '../../redux/services/DeezerApi'

import { Albums } from '../List'
import { MoreButton } from '../Buttons'
import { useSearchParams } from 'react-router-dom'

const AlbumChart = ({ blacklist, favorites }) => {
  const [params, setParams] = useSearchParams()
  const {data, isFetching, error} = useGetTopChartAlbumsQuery( params.get('genre') )

  return (
    <>
    <Albums isFetching={isFetching} error={error} albums={data?.data} blacklist={blacklist} favorites={favorites} />
    <MoreButton />
    </>
  )
}

export default AlbumChart
