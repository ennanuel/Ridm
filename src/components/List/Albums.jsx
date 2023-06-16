import { AlbumCard } from '../Cards'
import { AlbumLoading, Error } from '../LoadersAndError'
import Sort from './Sort'

const Albums = ({ albums, children, showSort, isFetching, error }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg lg:text-xl font-bold text-white">{children}</h3>
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
              albums &&
              albums.slice(0, 5).map( (album, i) => (
                <AlbumCard key={i} i={i} isRelated={true} album={album} />
              ))
          }
        </div>
      }
    </div>
  )
}

export default Albums
