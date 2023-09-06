import Logo from '../Sidebar/Logo'
import Searchbar from './Searchbar'
import Navigations from './Navigations'
import MusicPlayer from '../MusicPlayer'

const NavigationAndSearch = ({ goFront, goBack, scrolled, scrolledUp, activeSong }) => {
  return (
  <div className={`flex flex-row items-center justify-between gap-5 z-10 top-0 left-0 sticky transition-[background-color,transform] ${scrolled ? 'bg-[#151515]' : 'bg-transparent'} ${scrolledUp && 'translate-y-[-100%] lg:translate-y-[0]'}`}>
    <div className="relative flex flex-1 items-center justify-between lg:justify-start gap-2 mx-2 md:mx-4">
      <div className="lg:hidden">
          <Logo />
      </div>
      <Navigations scrolled={scrolled} goBack={goBack} goFront={goFront} />
      <Searchbar />
    </div>
    { (activeSong?.id && window.innerWidth >= 1024) && <MusicPlayer scrolled={scrolled} /> }
  </div>
  )
}

export default NavigationAndSearch
