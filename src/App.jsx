import { useState, useEffect, useRef, useLayoutEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { ArtistDetails, Discover, Search, SongDetails, TopCharts, AlbumDetails, Welcome, Genres, Playlist, GenreDetails, PlaylistDetails, Favorites, Blacklist } from './pages';

import { setPlayer } from './redux/features/playerSlice';
import { setLibrary } from './redux/features/librarySlice';

import { MessageBox, AddToPlaylist, Prompt } from './components/Prompts'
import Sidebar from './components/Sidebar'
import NavigationAndSearch from './components/NavigationAndSearch';

const App = () => {
  const colors = ['#122f55', '#3f2842', '#655638', '#593030', '#2e2e59', '#005151']

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [{scrollY, scrolled, scrolledUp}, setScroll] = useState({})
  const [color, setColor] = useState('#2c3b4d')

  const divRef = useRef()

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const goFront = () => {
    navigate(1) || null
  }

  const goBack = () => {
    navigate(-1) || null
  }

  const handleScroll = e => {
    setScroll( prev => (
      {
        scrollY: e.target.scrollTop, 
        scrolled: e.target.scrollTop > 50, 
        scrolledUp: scrollY < e.target.scrollTop
      }
    ))
  }

  useLayoutEffect(() => {
    const playerStorage = localStorage.getItem('player')
    const libraryStorage = localStorage.getItem('library')

    if(playerStorage) dispatch(setPlayer(JSON.parse(playerStorage)))
    if(libraryStorage) dispatch(setLibrary(JSON.parse(libraryStorage)))
  }, [])

  useEffect( () => {
    if(/show/.test(location.search)) return;
    divRef.current.scroll(0, 0)
  }, [location])

  useEffect( () => {
    setColor(colors[Math.floor(Math.random() * colors.length)])
  }, [activeSong])

  return (
    <div
      style={{
        '--color': color
      }} 
      className={`relative h-[100vh] flex flex-col-reverse justify-between lg:justify-start lg:flex-row w-full normal_gradient ${isPlaying && 'changing_gradient'}`}
    >
      <Sidebar />
      <div ref={divRef} onScroll={handleScroll} className={`relative h-full lg:flex-1`}>
        <NavigationAndSearch isPlaying={isPlaying} activeSong={activeSong} scrolled={scrolled} scrolledUp={scrolledUp} goBack={goBack} goFront={goFront} />
        <MessageBox />
        <AddToPlaylist />
        <Prompt />
        <Welcome />
        <div className={`w-full ${activeSong?.id ? 'h-[calc(100%-140px)]' : 'h-[calc(100%-90px)]'} lg:h-[100%] overflow-y-scroll overflow-x-clip`}>
          <Routes>
            <Route path="/charts" element={<TopCharts divRef={divRef} />} />
            <Route path="/*" element={<Discover />} />
            <Route path="/artists/:id" element={<ArtistDetails />} />
            <Route path="/albums/:id" element={<AlbumDetails />} />
            <Route path="/songs/:songid" element={<SongDetails />} />
            <Route path="/search/:searchTerm" element={<Search />} />

            <Route path="/genres/" element={<Genres />} />
            <Route path="/genres/:id" element={<GenreDetails />} />
                  
            <Route path="/playlists/" element={<Playlist />} />
            <Route path="/playlists/:id" element={<PlaylistDetails />} />

            <Route path="/favorites" element={<Favorites />} />
            <Route path="/blacklist" element={<Blacklist />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
