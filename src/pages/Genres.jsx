import { useGetTopGenresQuery } from "../redux/services/DeezerApi"

import { Genres } from "../components/List"
import { GenreLoading, Error } from "../components/LoadersAndError"
import { useSelector } from "react-redux"

const GenresPage = () => {
  const { blacklist, favorites } = useSelector(state => state.library)
  const { data, isFetching, error } = useGetTopGenresQuery()

  return (
    <Genres blacklist={blacklist} favorites={favorites} genres={data?.data} isFetching={isFetching} error={error}>Genres</Genres>
  )
}

export default GenresPage
