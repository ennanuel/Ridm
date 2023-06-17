import { useGetTopChartAlbumsQuery } from '../../redux/services/DeezerApi'

import { Albums } from '../List'
import { MoreButton } from '../Buttons'

const AlbumChart = ({ blacklist, favorites, params }) => {
  const {data, isFetching, error} = useGetTopChartAlbumsQuery()

  return (
    <>
    <Albums isFetching={isFetching} error={error} albums={data?.data} blacklist={blacklist} favorites={favorites} />
    <MoreButton />
    </>
  )
}

export default AlbumChart
