import { useEffect, useState } from 'react'

import { AlbumCard } from '../Cards'
import { AlbumLoading, Error } from '../LoadersAndError'
import Sort from './Sort'

import { getData } from '../../functions/getData'

const Albums = ({ albums, children, showSort, isFetching, error, favorites, blacklist, showmore, genreid }) => {
  const [newAlbums, setNewAlbums] = useState([])
  const [i, setI] = useState(0)

  useEffect(() => {
    setNewAlbums(() => getData({type: 'albums', data: albums, blacklist, favorites}))
    setI(prev => prev + 1)
    console.log(i)
  }, [blacklist, favorites, albums])

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-xl">{children}</h3>
        { showmore && <SeeMore link={`/charts?type=albums&genre=${genreid}`} /> }
      </div>
      {
        showSort && <Sort />
      }
      {
        isFetching ?
        <AlbumLoading num={4} /> :
        error ?
        <Error title="Could not load albums" /> :
        <div className="text-white grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {   
              newAlbums &&
              newAlbums.slice(0, 5).map( (album, i) => (
                <AlbumCard key={i} i={i} isRelated={true} album={album} />
              ))
          }
        </div>
      }
    </div>
  )
}

export default Albums
