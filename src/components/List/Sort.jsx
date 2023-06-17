import { useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'

const Sort = () => {
  const [showTypes, setShowTypes] = useState(false)
  
  const show = () => setShowTypes(true)
  const hide = () => setShowTypes(false)

  return (
    <div className="flex flex-row justify-start items-start gap-2 mb-4 relative z-[2]">
        <button className="px-4 h-[36px] rounded-lg flex flex-row items-center justify-center bg-white/5 shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10">Latest</button>
        <button className="px-4 h-[36px] rounded-lg flex flex-row items-center justify-center bg-white/5 shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10">Popularity</button>
        <div onMouseOver={show} onMouseOut={hide} className="px-4 h-[36px] text-gray-300 font-bold text-sm bg-[#151515] rounded-lg hover:[#202020] relative">
            <span className="relative z-[1] flex items-center justify-center h-full w-full shadow-sm shadow-black/50">Type <BiChevronDown size={20} className="ml-1 mr-[-2px]" /></span>
            {
              showTypes && (
                <ul className="animate-slowfade absolute top-[50%] left-0 pt-[36px] flex flex-col bg-[#151515] shadow-xl shadow-black rounded-md p-1 gap-2 w-full">
                    <li onClick={hide} className="w-full p-1 hover:bg-white/5 rounded-md px-2">Album</li>
                    <li onClick={hide} className="w-full p-1 hover:bg-white/5 rounded-md px-2">EP</li>
                    <li onClick={hide} className="w-full p-1 hover:bg-white/5 rounded-md px-2">LP</li>
                    <li onClick={hide} className="w-full p-1 hover:bg-white/5 rounded-md px-2">Single</li>
                </ul>
              )
            }
        </div>
    </div>
  )
}

export default Sort
