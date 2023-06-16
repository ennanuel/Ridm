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
  const [scrolled, setScrolled] = useState(false)
  const colors = ['#1c1f23', '#241c25', '#211f1b', '#231c1c', '#1b1b23', '#171f1f']
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
    setScrolled(e.target.scrollTop > 50)
  }

  useEffect( () => {
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
      className={`relative max-h-[100vh] h-[100vh] flex flex-row w-full max-w-[100vw] normal_gradient ${isPlaying && 'changing_gradient'}`}
    >
      <Sidebar />
      <section 
        className="relative flex-1 flex flex-col"
      >
        <MessageBox />
        <AddToPlaylist />
        <Prompt />
        <div ref={divRef} className="relative z-20 flex flex-col max-h-[100vh]">
          <div style={{backgroundColor: isPlaying && scrolled ?  'var(--color)' : ''}} className={`hidden lg:flex flex-row items-center justify-between gap-5 z-10 top-0 right-0 w-full absolute transition-[background-color] ${scrolled ? 'bg-black' : 'bg-transparent'}`}>
            <NavigationAndSearch goFront={goFront} goBack={goBack} scrolled={scrolled} />
            { activeSong?.id && <MusicPlayer scrolled={scrolled} /> }
          </div>
          <div onScroll={handleScroll} className={`min-h-[100vh] overflow-y-scroll ${activeSong?.id ? "pb-[100px]" : "pb-[70px]"} lg:pb-0`}>
            <Routes>
              <Route path="/welcome" element={<Welcome />} />
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
