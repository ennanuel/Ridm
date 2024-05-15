import { useRef, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { useSearchParams } from 'react-router-dom'

const Sort = ({ type = 'track' }) => {
  const ulRef = useRef();
  const [params, setParams] = useSearchParams();
  const [showTypes, setShowTypes] = useState(false);

  const handleClick = (type, value) => { 
    setParams(prev => ({ ...prev, [type]: prev[type] == value ? null : value }))
    hide()
  }
  
  const show = () => setShowTypes(true)
  const hide = () => setShowTypes(false)

  return (
    <div id="sort" className="flex flex-row justify-start items-start gap-2 relative z-[2] mt-4 mb-8">
      <button
        className={`px-4 h-[36px] rounded-[20px] flex flex-row items-center justify-center text-gray-300 font-bold text-sm hover:bg-white/10 ${ params.get('sort') != 'popular' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-300'}`}
        onClick={() => handleClick('sort', 'recent')}
      >Latest</button>
      <button
        className={`px-4 h-[36px] rounded-[20px] flex flex-row items-center justify-center text-gray-300 font-bold text-sm hover:bg-white/10 ${ params.get('sort') == 'popular' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-300'}`}
        onClick={() => handleClick('sort', 'popular')}
      >Popularity</button>
      {
        type == 'album' &&
        <div className={`px-4 h-[36px] rounded-[20px] ${showTypes ? 'bg-black' : 'bg-black/50'}  min-w-100px text-gray-300 font-bold text-sm relative`}>
            <button onClick={showTypes ? hide : show} className="relative z-[1] flex items-center justify-center h-full w-full capitalize">
              <span>{params.get('filter') || 'All'}</span>
              <BiChevronDown size={20} className="ml-1 mr-[-2px]" />
            </button>
            {
              showTypes &&
                <ul className="animate-slowfade absolute top-[calc(100%_+_10px)] left-0 flex flex-col backdrop-blur-lg bg-black/50 rounded-[20px] overflow-hidden w-full min-w-[100px] text-xs md:text-sm shadow-xl shadow-black/30">
                  <li onClick={() => handleClick('filter', '')} className="w-full flex items-center justify-start h-[36px] hover:bg-white/5 px-4">
                    <a href="#sort">All</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'album')} className="w-full flex items-center justify-start h-[36px] hover:bg-white/5 px-4">
                    <a href="#sort">Album</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'EP')} className="w-full flex items-center justify-start h-[36px] hover:bg-white/5 px-4">
                    <a href="#sort">EP</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'LP')} className="w-full flex items-center justify-start h-[36px] hover:bg-white/5 px-4">
                    <a href="#sort">LP</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'single')} className="w-full flex items-center justify-start h-[36px] hover:bg-white/5 px-4">
                    <a href="#sort">Single</a>
                  </li>
                </ul>
            }
        </div>
      }
    </div>
  )
}

export default Sort
