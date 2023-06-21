import { useState, useEffect, useRef } from 'react'

import { useSelector } from 'react-redux';

import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { ArtistDetails, Discover, Search, SongDetails, TopCharts, AlbumDetails, Welcome, Genres, Playlist, GenreDetails, PlaylistDetails, Favorites, Blacklist } from './pages';

import { MessageBox, AddToPlaylist, Prompt } from './components/Prompts'
import Sidebar from './components/Sidebar'
import MusicPlayer from './components/MusicPlayer'
import NavigationAndSearch from './components/NavigationAndSearch';

const App = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [{scrollY, scrolled, scrolledUp}, setScroll] = useState({})
  const colors = ['#122f55', '#3f2842', '#655638', '#593030', '#2e2e59', '#005151']
  const divRef = useRef()
  const [color, setColor] = useState('#2c3b4d')
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
      className={`relative h-full flex flex-row w-[100vw] normal_gradient ${isPlaying && 'changing_gradient'}`}
    >
      <Sidebar />
      <section 
        className="relative flex-1 flex flex-col"
      >
        <MessageBox />
        <AddToPlaylist />
        <Prompt />
        <Welcome />
        <div className="relative flex flex-col h-full">
          <NavigationAndSearch isPlaying={isPlaying} activeSong={activeSong} scrolled={scrolled} scrolledUp={scrolledUp} goBack={goBack} goFront={goFront} />
          <div ref={divRef} onScroll={handleScroll} className={`h-[100vh] overflow-y-scroll ${activeSong?.id ? "pb-[100px]" : "pb-[70px]"} lg:pb-0`}>
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

      </section>
    </div>
  );
};

export default App;
