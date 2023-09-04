import { useEffect, useState } from 'react'
import { GenreCard } from '../Cards'
import { GenreLoading, Error } from '../LoadersAndError'
import { getData } from '../../functions/getData'

const Genres = ({children, genres, isFetching, error, blacklist, favorites, noFilter}) => {
  const [newGenres, setNewGenres] = useState([])

  useEffect(() => {
    setNewGenres(getData({type: 'genres', data: genres, blacklist, favorites, noFilter}))
  }, [blacklist, favorites, genres, noFilter])

  return (
    <>
      <h2 className="text-white font-bold text-2xl mb-4">{children}</h2>
      {
        isFetching ?
        <GenreLoading num={10} /> :
        (
          error ?
          <Error title="Could not load genres" /> :
          <div className="grid grid-cols-2 md:grid-cols-4 items-center justify-center gap-6">
            {
              newGenres.map( (genre, i) => (
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
