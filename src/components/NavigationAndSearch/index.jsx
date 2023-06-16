import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import Searchbar from './Searchbar'

const NavigationAndSearch = ({ goFront, goBack, scrolled }) => {
  return (
    <div className="relative flex items-center gap-2 mx-4">
      <button onClick={goBack} className={`h-[30px] aspect-square flex items-center justify-center rounded-md text-gray-200 transition-transform active:scale-90 opacity-80 hover:opacity-100 ${scrolled ? 'bg-white/5' : 'bg-black/80'}`}><BsChevronLeft size={20} /></button>
      <button onClick={goFront} className={`h-[30px] aspect-square flex items-center justify-center rounded-md text-gray-200 transition-transform active:scale-90 opacity-80 hover:opacity-100 ${scrolled ? 'bg-white/5' : 'bg-black/80'}`}><BsChevronRight size={20} /></button>
      <Searchbar />
    </div>
  )
}

export default NavigationAndSearch
