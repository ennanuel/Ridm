import { useEffect, useState } from 'react'

import { AlbumCard } from '../Cards'
import { AlbumLoading, Error } from '../LoadersAndError'
import Sort from './Sort'
import SeeMore from './SeeMore'

import { getData } from '../../utils/getData'
import { useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Albums = ({ albums, children, showSort, isFetching, error, showmore, genreid, noFilter }) => {
  const library = useSelector(state => state.library);
  const [params, setParams] = useSearchParams();
  const [newAlbums, setNewAlbums] = useState([]);

  useEffect(() => {
    const sortType = params.get('sort');
    const albumFilter = params.get('filter');
    const albumsData = getData({ type: 'albums', data: albums, noFilter, sortType, albumFilter });
    setNewAlbums(albumsData);
  }, [library, albums, noFilter, params])

  return (
    <div className="mb-8">
      <div className="flex items-end justify-between mb-4">
        {
          children && isFetching ?
            <span className="h-6 rounded-md w-full max-w-[240px] loading-animation bg-white/5"></span> :
            <h3 className="text-white font-bold text-xl">{children}</h3>
        }
        {
          showmore &&
          <SeeMore link={`/charts?type=albums&genre=${genreid}`} />
        }
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
                newAlbums.map((album, i) => (
                  <AlbumCard key={i} i={i} isRelated={true} album={album} />
                ))
              }
            </div>
      }
    </div>
  );
}

export default Albums
