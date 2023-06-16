import { GenreCard } from '../Cards'
import { GenreLoading, Error } from '../LoadersAndError'

const Genres = ({children, genres, isFetching, error}) => {
  return (
    <>
      <h2 className="text-white font-bold text-2xl m-4 md:mt-[80px]">{children}</h2>
      {
        isFetching ?
        <GenreLoading num={10} /> :
        (
          error ?
          <Error title="Could not load genres" /> :
          <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-6 p-6">
            {
              genres.map( (genre, i) => (
                <GenreCard key={i} genre={genre} i={i} />
              ))
            }
          </div>
        )
      }
    </>
  )
}

export default Genres
