import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const Navigations = ({ goBack, goFront, scrolled }) => {
  return (
    <>
    <button onClick={goBack} className={`h-[30px] aspect-square hidden lg:flex items-center justify-center rounded-md text-gray-200 transition-transform active:scale-90 opacity-80 hover:opacity-100 ${scrolled ? 'bg-white/5' : 'bg-black/80'}`}><BsChevronLeft size={20} /></button>
    <button onClick={goFront} className={`h-[30px] aspect-square hidden lg:flex items-center justify-center rounded-md text-gray-200 transition-transform active:scale-90 opacity-80 hover:opacity-100 ${scrolled ? 'bg-white/5' : 'bg-black/80'}`}><BsChevronRight size={20} /></button>
    </>
  )
}

export default Navigations
