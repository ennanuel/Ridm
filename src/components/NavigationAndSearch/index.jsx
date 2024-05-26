import { useEffect, useState } from 'react'
import Logo from '../Sidebar/Logo'
import Searchbar from './Searchbar'
import Navigations from './Navigations'
import MusicPlayer from '../MusicPlayer'
import { useSelector } from 'react-redux'

const NavigationAndSearch = ({ bodyRef }) => {
  const { nowPlaying } = useSelector((state) => state.player);
  const [{ scrolled, scrolledUp }, setScroll] = useState({ scrolled: false, scrolledUp: false, scrollTop: 0 });

  const handleScroll = (event) => {
    setScroll(
      (prev) => ({
        scrolled: event.target.scrollTop > 50,
        scrollTop: event.target.scrollTop,
        scrolledUp: prev.scrollTop < event.target.scrollTop
      })
    );
  }

  useEffect(() => {
    if (!bodyRef) return;
    bodyRef.addEventListener('scroll', handleScroll);
    return () => bodyRef.removeEventListener('scroll', handleScroll);
  }, [bodyRef]);
  
  return (
    <div className="top-0 z-[999] sticky flex justify-between gap-2 p-2">
      <div className={`flex flex-1 flex-row items-center justify-between gap-5 transition-[background-color,transform] py-2 border ${nowPlaying && 'opacity-0 pointer-events-none'} ${scrolled ? 'bg-transparent backdrop-blur-lg border-white/5' : 'bg-transparent border-transparent lg:border-white/5'} ${scrolledUp && 'translate-y-[-150%] lg:translate-y-[0]'} rounded-[15px]`}>
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
