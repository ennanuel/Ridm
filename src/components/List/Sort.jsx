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
    <div id="sort" className="flex flex-row justify-start items-start gap-2 mb-4 relative z-[2]">
      <button
        className={`px-4 h-[36px] rounded-[5px] flex flex-row items-center justify-center shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10 ${ params.get('sort') != 'popular' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-300'}`}
        onClick={() => handleClick('sort', 'recent')}
      >Latest</button>
      <button
        className={`px-4 h-[36px] rounded-[5px] flex flex-row items-center justify-center shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10 ${ params.get('sort') == 'popular' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-300'}`}
        onClick={() => handleClick('sort', 'popular')}
      >Popularity</button>
      {
        type == 'album' &&
        <div onMouseOver={show} onMouseOut={hide} className={`px-4 h-[36px] min-w-100px text-gray-300 font-bold text-sm bg-black/50 relative ${showTypes ? 'rounded-t-[5px]' : 'rounded-[5px]'}`}>
            <button className="relative z-[1] flex items-center justify-center h-full w-full shadow-black/50 capitalize">
              {params.get('filter') || 'All'} <BiChevronDown size={20} className="ml-1 mr-[-2px]" />
            </button>
            {
              showTypes &&
                <ul className="animate-slowfade absolute top-[100%] left-0 flex flex-col backdrop-blur-lg bg-black/50 shadow-xl shadow-black/50 rounded-b-md p-1 gap-2 w-full text-xs md:text-sm">
                  <li onClick={() => handleClick('filter', '')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">
                    <a href="#sort">All</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'album')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">
                    <a href="#sort">Album</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'EP')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">
                    <a href="#sort">EP</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'LP')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">
                    <a href="#sort">LP</a>
                  </li>
                  <li onClick={() => handleClick('filter', 'single')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">
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
