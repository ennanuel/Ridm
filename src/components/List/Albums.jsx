import { useEffect, useState } from 'react'

import { AlbumCard } from '../Cards'
import { AlbumLoading, Error } from '../LoadersAndError'
import Sort from './Sort'
import SeeMore from './SeeMore'

import { getData } from '../../functions/getData'
import { useSearchParams } from 'react-router-dom'

const Albums = ({ albums, children, showSort, isFetching, error, favorites, blacklist, showmore, genreid, noFilter }) => {
  const [params, setParams] = useSearchParams()
  const [newAlbums, setNewAlbums] = useState([])

  useEffect(() => {
    setNewAlbums(() => getData({type: 'albums', data: albums, blacklist, favorites, noFilter, params }))
  }, [blacklist, favorites, albums, noFilter, params])

  return (
    <div className="mb-8">
      <div className="flex items-end justify-between mb-4">
        <h3 className="text-white font-bold text-xl">{children}</h3>
        { showmore && <SeeMore link={`/charts?type=albums&genre=${genreid}`} /> }
      </div>
      {
        showSort && <Sort type="album" />
      }
      {
        isFetching ?
        <AlbumLoading num={5} /> :
        error ?
        <Error title="Could not load albums" /> :
        <div className="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {   
              newAlbums &&
              newAlbums.map( (album, i) => (
                <AlbumCard key={i} i={i} isRelated={true} album={album} />
              ))
          }
        </div>
      }
    </div>
  )
}

export default Albums
