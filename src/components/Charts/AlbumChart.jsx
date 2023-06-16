import { useGetTopChartAlbumsQuery } from '../../redux/services/DeezerApi'

import { Albums } from '../List'

const AlbumChart = () => {
  const {data, isFetching, error} = useGetTopChartAlbumsQuery()

  return (
    <>
    <Albums isFetching={isFetching} error={error} albums={data?.data || []} />
    <button className='py-2 px-4 text-sm border-2 border-gray-400 bg-white/5 text-gray-400 font-bold opacity-80 transition-[opacity,transform] hover:opacity-100 active:scale-90'>See More</button>
    </>
  )
}

export default AlbumChart
