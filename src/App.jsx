import { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { ArtistDetails, Discover, Search, SongDetails, TopCharts, AlbumDetails, Welcome, Genres, Playlist, GenreDetails, PlaylistDetails, Favorites, Blacklist } from './pages';
import Details from './components/Details';

import { setPlayer } from './redux/features/playerSlice';
import { setLibrary } from './redux/features/librarySlice';

import { MessageBox, AddToPlaylist, Prompt } from './components/Prompts'
import MobileNavLinks from './components/Sidebar/MobileNavLinks';
import NavLinks from './components/Sidebar/NavLinks';

import { links, secondLinks } from './assets/data/constants';
import NavigationAndSearch from './components/NavigationAndSearch';

const App = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [{ scrollY, scrolled, scrolledUp }, setScroll] = useState({})
  
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const goFront = () => {
    navigate(1) || null
  }

  const goBack = () => {
    navigate(-1) || null
  }

  const handleScroll = () => {
    setScroll(prev => ({
      scrollY: window.scrollY, 
      scrolled: window.scrollY > 50, 
      scrolledUp: prev.scrollY < window.scrollY
    }))
  }

  useLayoutEffect(() => {
    const playerStorage = localStorage.getItem('player')
    const libraryStorage = localStorage.getItem('library')

    if(playerStorage) dispatch(setPlayer(JSON.parse(playerStorage)))
    if(libraryStorage) dispatch(setLibrary(JSON.parse(libraryStorage)))
  }, [])
  
  useEffect(() => { 
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect( () => {
    if(/show/.test(location.search)) return;
    window.scroll(0, 0)
  }, [location])

  return (
    <div
      className={`relative w-full grid grid-cols-1 lg:grid-cols-[300px,1fr] lg:grid-rows-[60px,1fr] bg-[#101010] ${isPlaying && ''}`}
    >
      <NavLinks links={links} secondLinks={secondLinks} />  
        <NavigationAndSearch isPlaying={isPlaying} activeSong={activeSong} scrolled={scrolled} scrolledUp={scrolledUp} goBack={goBack} goFront={goFront} />
        <MessageBox />
        <AddToPlaylist />
        <Prompt />
        <Welcome />
        <div className="min-h-[90vh]">
          <Routes>
            <Route path="/charts" element={<TopCharts />} />
            <Route path="/*" element={<Discover />} />
            <Route element={<Details />}>
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/albums/:id" element={<AlbumDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
            </Route>
            <Route path="/search/:searchTerm" element={<Search />} />

            <Route path="/genres/" element={<Genres />} />
            <Route path="/genres/:id" element={<GenreDetails />} />
                  
            <Route path="/playlists/" element={<Playlist />} />
            <Route path="/playlists/:id" element={<PlaylistDetails />} />

            <Route path="/favorites" element={<Favorites />} />
            <Route path="/blacklist" element={<Blacklist />} />
          </Routes>
      </div>
      <MobileNavLinks activeSong={activeSong} links={links} secondLinks={secondLinks} />
    </div>
  );
};

export default App;
