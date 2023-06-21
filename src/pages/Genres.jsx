import { useGetTopGenresQuery } from "../redux/services/DeezerApi"

import { Genres } from "../components/List"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const GenresPage = () => {
  const { blacklist, favorites } = useSelector(state => state.library)
  const { data, isFetching, error } = useGetTopGenresQuery()

  useEffect(() => {
    document.getElementById('site_title').innerText = 'Ridm - Genres'
  }, [])

  return (
    <div className="mt-[60px] p-2 md:p-4">
      <Genres blacklist={blacklist} favorites={favorites} genres={data?.data} isFetching={isFetching} error={error}>Genres</Genres>
    </div>
  )
}

export default GenresPage
