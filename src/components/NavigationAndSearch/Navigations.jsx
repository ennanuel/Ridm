import { useMemo } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const Navigations = () => {
  const navigate = useNavigate();
  const goBack = useMemo(() => () => navigate(-1), []);
  const goFront = useMemo(() => () => navigate(+1), []);
  
  return (
    <>
      <button onClick={goBack} className={`h-[40px] aspect-square hidden lg:flex items-center justify-center rounded-[20px] text-gray-200 transition-transform active:scale-90 opacity-80 hover:opacity-100 bg-black/50`}><BsChevronLeft size={20} /></button>
      <button onClick={goFront} className={`h-[40px] aspect-square hidden lg:flex items-center justify-center rounded-[20px] text-gray-200 transition-transform active:scale-90 opacity-80 hover:opacity-100 bg-black/50`}><BsChevronRight size={20} /></button>
    </>
  )
}

export default Navigations
