import { BiChevronDown } from 'react-icons/bi'

const Sort = () => {
  return (
    <div className="flex flex-row justify-start items-start gap-4 my-4 relative z-[2]">
        <button className="px-4 h-[36px] rounded-[18px] flex flex-row items-center justify-center bg-white/5 shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10">Latest</button>
        <button className="px-4 h-[36px] rounded-[18px] flex flex-row items-center justify-center bg-white/5 shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10">Popularity</button>
        <div className="px-4 h-[36px] rounded-[86px] flex flex-row items-center justify-center bg-white/5 shadow-sm shadow-black/50 text-gray-300 font-bold text-sm hover:bg-white/10 relative">
            Type <BiChevronDown size={20} className="ml-1 mr-[-2px]" />
            <ul className="absolute top-[100%] left-0 mt-2 flex flex-col bg-[#151515] shadow-xl shadow-black rounded-md p-1 gap-2 w-full">
                <li className="w-full p-1 hover:bg-white/5 rounded-md px-2">Album</li>
                <li className="w-full p-1 hover:bg-white/5 rounded-md px-2">EP</li>
                <li className="w-full p-1 hover:bg-white/5 rounded-md px-2">LP</li>
                <li className="w-full p-1 hover:bg-white/5 rounded-md px-2">Single</li>
            </ul>
        </div>
    </div>
  )
}

export default Sort
