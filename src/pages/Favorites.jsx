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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8 w-full">
            <section className="flex flex-col gap-4 min-h-[80vh]">
              <h3 className="font-bold text-xl text-gray-200">Artists</h3>
              {
                favoriteLibrary.artists.length ?
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {
                      favoriteLibrary.artists.map((artist) => (
                        <li key={artist.id}><ArtistCard artist={artist} /></li>
                      ))
                    }
                  </ul> :
                  <div className="flex-1 flex flex-col gap-4 items-center justify-center">
                    <span className="font-semibold text-gray-300">You haven't liked any artists</span>
                    <Link to="/charts?type=artists" className="flex items-center justify-center font-bold px-4 sm:px-6 h-8 md:h-10 rounded-full bg-gray-200 hover:bg-gray-400 text-black">View Artists</Link>
                  </div>
              }
            </section>
            <section className="md:row-span-3">
              <div className="sticky top-[80px] flex flex-col gap-4 border border-white/5 rounded-[20px] bg-white/5 p-4 md:h-[83vh]">
                <h3 className="font-bold text-xl text-gray-200">Songs</h3>
                {
                  favoriteLibrary.tracks.length > 0 ?
                    <ul className="flex flex-col gap-2 flex-1 overflow-y-scroll overflow-x-clip">
                      {favoriteLibrary.tracks.map((song) => (
                        <li key={song.id}><SongBar song={song} /></li>
                      ))}
                    </ul> :
                  <div className="flex-1 flex flex-col gap-4 items-center justify-center">
                    <span className="font-semibold text-gray-300">You haven't liked any songs</span>
                    <Link to="/charts?type=tracks" className="flex items-center justify-center font-bold px-4 sm:px-6 h-8 md:h-10 rounded-full bg-gray-200 hover:bg-gray-400 text-black">View Artists</Link>
                  </div>
                }
              </div>
            </section>
              
            <section className="flex flex-col gap-4 min-h-[80vh]">
              <h3 className="font-bold text-xl text-gray-200">Albums</h3>
              {
                favoriteLibrary.albums.length > 0 ?
                  <ul className="grid grid-cols-2 gap-4">
                    {
                      favoriteLibrary.albums.map((album) => (
                        <li key={album.id}><AlbumCard album={album} /></li>
                      ))
                    }
                  </ul> :
                  <div className="flex-1 flex flex-col gap-4 items-center justify-center">
                    <span className="font-semibold text-gray-300">You haven't liked any albums</span>
                    <Link to="/charts?type=albums" className="flex items-center justify-center font-bold px-4 sm:px-6 h-8 md:h-10 rounded-full bg-gray-200 hover:bg-gray-400 text-black">View Artists</Link>
                  </div>
              }
            </section>

            <section className="flex flex-col gap-4 min-h-[80vh]">
              <h3 className="font-bold text-xl text-gray-200">Genres</h3>
              {
                favoriteLibrary.genres.length > 0 ?
                  <ul className='grid grid-cols-2 gap-4'>
                    {
                      favoriteLibrary.genres.map((genre) => <li key={genre.id}><GenreCard genre={genre} /></li>)
                    }
                  </ul> :
                  <div className="flex-1 flex flex-col gap-4 items-center justify-center">
                    <span className="font-semibold text-gray-300">You haven't liked any genres</span>
                    <Link to="/genres" className="flex items-center justify-center font-bold px-4 sm:px-6 h-8 md:h-10 rounded-full bg-gray-200 text-black hover:bg-gray-400">View Artists</Link>
                  </div>
              }
            </section>

            <section className="md:col-span-2 flex flex-col gap-4 sticky top-[70px] min-h-[80vh]">
              <h3 className="font-bold text-xl text-gray-200">Radios</h3>
              {
                favoriteLibrary.radios.length > 0 ?
                  <Radios radios={favoriteLibrary.radios} /> :
                  <div className="flex-1 flex flex-col gap-4 items-center justify-center">
                    <span className="font-semibold text-gray-300">You haven't liked any radios</span>
                    <Link to="/charts?type=radios" className="flex items-center justify-center font-bold px-4 sm:px-6 h-8 md:h-10 rounded-full bg-gray-200 text-black hover:bg-gray-400">View Artists</Link>
                  </div>
              }
            </section>
          </div> :
          <div className="p-4 flex-1 flex flex-col items-center justify-center gap-4">
            <h3 className="text-gray-400 font-bold text-xl">You haven't liked anything yet.</h3>
            <Link to="/" className="px-4 sm:px-6 h-8 md:h-10 flex items-center justify-center rounded-full border border-white/5 hover:bg-gray-400 text-xs md:text-sm font-bold bg-gray-200 text-black">Go Home</Link>
          </div>
      }
    </div>
  )
}

export default Favorites
