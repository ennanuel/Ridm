import { useState, useEffect } from 'react'
import { ArtistCard } from '../Cards'
import { ArtistLoading, Error } from '../LoadersAndError'
import { getData } from '../../functions/getData'
import SeeMore from './SeeMore'
import { useSearchParams } from 'react-router-dom'

const Artists = ({artists, children, isFetching, error, blacklist, favorites, showmore, genreid, noFilter}) => {
  const [params, setParams] = useSearchParams()
  const [newArtists, setNewArtists] = useState([])

  useEffect(() => {
    setNewArtists(getData({type: 'artists', data: artists, blacklist, favorites, noFilter, params }))
  }, [blacklist, favorites, artists, noFilter])
  return (
    <div className="mb-8">
      <div className="flex items-end justify-between mb-4">
        <h3 className="text-white font-bold text-xl">{children}</h3>
        { showmore && <SeeMore link={`/charts?type=artists&genre=${genreid}`} /> }
      </div>

      {
        isFetching ?
        <ArtistLoading num={5} /> :
        (
          error ?
          <Error title="Something went wrong" /> :
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 md:gap-4">
            {
                newArtists &&
                newArtists.map( (artist, i) => <ArtistCard key={i} i={i} artist={artist} /> )
            }
          </div>
        )
      }
    </div>
  )
}

export default Artists
