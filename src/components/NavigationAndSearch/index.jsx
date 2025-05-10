import { useEffect, useState } from 'react'
import Logo from '../Sidebar/Logo'
import Searchbar from './Searchbar'
import Navigations from './Navigations'
import MusicPlayer from '../MusicPlayer'
import { useSelector } from 'react-redux'

const NavigationAndSearch = () => {
  const { nowPlaying } = useSelector((state) => state.player);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const container = document.getElementById('main-body');
    if (!container) return;
    
    const handleScroll = (event) => {
      setScrolled(event.target.scrollTop > 50);
    }

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="top-0 z-[999] sticky flex justify-between gap-2 p-2">
      <div className={`flex flex-1 flex-row items-center justify-between gap-5 transition-[background-color,transform] py-2 border ${nowPlaying && 'opacity-0 pointer-events-none'} ${scrolled ? 'bg-black/20 backdrop-blur-lg border-white/5' : 'bg-transparent border-transparent lg:border-white/5'} rounded-2xl`}>
        <div className="relative flex flex-1 items-center justify-between lg:justify-start gap-2 mx-2 md:mx-4">
          <div className="lg:hidden">
            <Logo />
          </div>
          <Navigations />
          <Searchbar scrolled={scrolled} />
        </div>
      </div>
      <MusicPlayer scrolled={scrolled} />
    </div>
  )
};

export default NavigationAndSearch
