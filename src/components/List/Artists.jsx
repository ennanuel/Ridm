import { useState, useEffect } from 'react'
import { ArtistCard } from '../Cards'
import { ArtistLoading, Error } from '../LoadersAndError'
import { getData } from '../../utils/getData'
import SeeMore from './SeeMore'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Artists = ({ artists, children, isFetching, error, showmore, genreid, noFilter }) => {
  const library = useSelector(state => state.library);
  const [params, setParams] = useSearchParams();
  const [newArtists, setNewArtists] = useState([]);

  useEffect(() => {
    const sortType = params.get('sort');
    const artistsData = getData({ type: 'artists', data: artists, noFilter, sortType });
    setNewArtists(artistsData);
  }, [library, artists, noFilter])
  
  return (
    <div className="mb-8">
      <div className="flex items-end justify-between mb-4">
        {
          children && isFetching ?
            <span className="h-6 rounded-md w-full max-w-[240px] bg-white/5 animation-loading"></span> :
            <h3 className="text-white/80 font-bold text-xl mb-6">{children}</h3>
        }
        {
          showmore &&
          <SeeMore link={`/charts?type=artists&genre=${genreid}`} />
        }
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
                  newArtists.map((artist, i) => <ArtistCard key={i} i={i} artist={artist} />)
                }
              </div>
          )
      }
    </div>
  )
}

export default Artists
