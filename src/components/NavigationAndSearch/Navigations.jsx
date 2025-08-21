import { useMemo } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'

const Navigations = () => {
  const navigate = useNavigate();
  const goBack = useMemo(() => () => navigate(-1), []);
  const goFront = useMemo(() => () => navigate(+1), []);
  
  return (
    <div className='flex items-center gap-2'>
      <button 
        onClick={goBack} 
        className={`h-8 aspect-square hidden lg:flex items-center justify-center rounded-full text-gray-300 transition-transform active:scale-90 hover:text-white bg-zinc-800/80`}
      >
        <FiChevronLeft size={20} />
      </button>
      <button 
        onClick={goFront} 
        className={`h-8 aspect-square hidden lg:flex items-center justify-center rounded-full text-gray-300 transition-transform active:scale-90 hover:text-white bg-zinc-800/80`}
      >
        <FiChevronRight size={20} />
      </button>
    </div>
  )
}

export default Navigations
