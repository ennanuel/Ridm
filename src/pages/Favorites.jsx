import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Radios } from '../components/List';
import { useEffect, useMemo } from 'react';
import { AlbumCard, ArtistCard, GenreCard, SongBar } from '../components/Cards';

const Favorites = () => {
  const { favorites } = useSelector(state => state.library);
  const favoriteLibrary = useMemo(() => (Object.entries(favorites))
    .map(([key, value]) => [key, value.map(item => ({ ...item, favorite: true }))])
    .reduce((otherEntries, [key, value]) => ({ ...otherEntries, [key]: value }), {})
  , [favorites]);

  useEffect(() => {
    document.getElementById('site_title').innerText = 'Ridm - Favorites';
  }, [])

  return (
    <div className="flex min-h-[90vh] px-2 md:px-4">
      {
        Object.values(favoriteLibrary).some((value) => value.length > 0) ?
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 gap-y-8">
            {
              favoriteLibrary.albums.length > 0 ?
                <section className={`flex flex-col gap-4 min-h-[80vh] ${!favoriteLibrary.albums.length && !favoriteLibrary.tracks.length ? 'col-span-2' : ''}`}>
                  <h3 className="font-bold text-xl text-gray-200">Artists</h3>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {
                      favoriteLibrary.artists.map((artist) => (
                        <li key={artist.id}><ArtistCard artist={artist} /></li>
                      ))
                    }
                  </ul>
                </section> :
                null
            }

            {
              favoriteLibrary.tracks.length > 0 ?
                <section className="md:row-span-3">
                  <div className="sticky top-[80px] flex flex-col gap-4 border border-white/5 rounded-[20px] bg-white/5 p-4 md:max-h-[83vh]">
                    <h3 className="font-bold text-xl text-gray-200">Songs</h3>
                    <ul className="flex flex-col gap-2 flex-1 overflow-y-scroll overflow-x-clip">
                      {favoriteLibrary.tracks.map((song) => (
                        <li key={song.id}><SongBar song={song} /></li>
                      ))}
                    </ul>
                  </div>
                </section> :
                null
            }
              
            {
              favoriteLibrary.albums.length > 0 ?
                <section className={`flex flex-col gap-4 min-h-[80vh] ${!favoriteLibrary.artists.length && !favoriteLibrary.tracks.length ? 'col-span-2' : ''}`}>
                  <h3 className="font-bold text-xl text-gray-200">Albums</h3>
                  <ul className='grid grid-cols-2 gap-4 md:grid-cols-2'>
                    {
                      favoriteLibrary.albums.map((album) => (
                        <li key={album.id}><AlbumCard album={album} /></li>
                      ))
                    }
                  </ul>
                </section> :
                null
            }

            {
              favoriteLibrary.genres.length > 0 ?
                <section className="flex flex-col gap-4 min-h-[80vh]">
                  <h3 className="font-bold text-xl text-gray-200">Genres</h3>
                  <ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                    {
                      favoriteLibrary.genres.map((genre) => <li key={genre.id}><GenreCard genre={genre} /></li>)
                    }
                  </ul>
                </section> :
                null
            }

            {
              favoriteLibrary.radios.length > 0 ?
                <section className="md:col-span-2 flex flex-col gap-4 sticky top-[70px] min-h-[80vh]">
                  <h3 className="font-bold text-xl text-gray-200">Radios</h3>
                  <Radios radios={favoriteLibrary.radios} />
                </section> :
                null
            }
          </div> :
          <div className="p-4 flex-1 flex flex-col items-center justify-center gap-4">
            <h3 className="text-gray-400 font-bold text-xl">You haven't liked anything yet.</h3>
            <Link to="/" className="px-4 h-[30px] md:h-[40px] flex items-center justify-center rounded-[20px] border border-white/5 hover:text-gray-400 hover:bg-white/5 text-xs md:text-sm font-bold bg-gray-400 text-black">Go Home</Link>
          </div>
      }
    </div>
  )
}

export default Favorites
