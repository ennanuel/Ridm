import { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { useSearchParams } from 'react-router-dom'

const Sort = ({ type = 'track' }) => {
  const [params, setParams] = useSearchParams();
  const [showTypes, setShowTypes] = useState(false)

  const handleClick = (type, value) => { 
    setParams(prev => ({ ...prev, [type]: prev[type] == value ? null : value }))
    hide()
  }
  
  const show = () => setShowTypes(true)
  const hide = () => setShowTypes(false)

  if (!setParams) return;

  return (
    <div className="flex flex-row justify-start items-start gap-2 mb-4 relative z-[2]">
      <button
        className={`px-4 h-[36px] rounded-[5px] flex flex-row items-center justify-center shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10 ${ params.get('sort') != 'recent' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-300'}`}
        onClick={() => handleClick('sort', 'popular')}
      >Popularity</button>
      <button
        className={`px-4 h-[36px] rounded-[5px] flex flex-row items-center justify-center shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10 ${ params.get('sort') == 'recent' ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-300'}`}
        onClick={() => handleClick('sort', 'recent')}
      >Latest</button>
      {
        type == 'album' &&
        <div onMouseOver={show} onMouseOut={hide} className="px-4 h-[36px] text-gray-300 font-bold text-sm bg-black/50 rounded-lg relative">
            <button className="relative z-[1] flex items-center justify-center h-full w-full shadow-sm shadow-black/50">
              Type <BiChevronDown size={20} className="ml-1 mr-[-2px]" />
            </button>
            {
              showTypes && (
                <ul className="animate-slowfade absolute top-[50%] left-0 pt-[36px] flex flex-col backdrop-blur-lg bg-black/50 shadow-xl shadow-black/50 rounded-md p-1 gap-2 w-full">
                    <li onClick={() => handleClick('filter', 'album')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">Album</li>
                    <li onClick={() => handleClick('filter', 'ep')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">EP</li>
                    <li onClick={() => handleClick('filter', 'lg')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">LP</li>
                    <li onClick={() => handleClick('filter', 'single')} className="w-full p-1 hover:bg-white/5 rounded-md px-2">Single</li>
                </ul>
              )
            }
        </div>
      }
    </div>
  )
}

export default Sort
