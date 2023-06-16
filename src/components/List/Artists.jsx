import { ArtistCard } from '../Cards'
import { ArtistLoading, Error } from '../LoadersAndError'

const Artists = ({artists, children, isFetching, error}) => {
  return (
    <div className="px-4 mt-6">
      <h3 className="text-white font-bold text-xl">{children}</h3>

      {
        isFetching ?
        <ArtistLoading num={5} /> :
        (
          error ?
          <Error title="Something went wrong" /> :
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 w-full gap-2 md:gap-4">
            {
                artists &&
                artists.slice(0, 5).map( (artist, i) => <ArtistCard key={i} i={i} artist={artist} /> )
            }
          </div>
        )
      }
    </div>
  )
}

export default Artists
