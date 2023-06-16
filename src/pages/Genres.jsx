import { useGetTopGenresQuery } from "../redux/services/DeezerApi"

import { Genres } from "../components/List"
import { GenreLoading, Error } from "../components/LoadersAndError"

const GenresPage = () => {
  const { data, isFetching, error } = useGetTopGenresQuery()

  return (
    <Genres genres={data?.data} isFetching={isFetching} error={error}>Genres</Genres>
  )
}

export default GenresPage
