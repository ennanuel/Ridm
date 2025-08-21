import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = ({ scrolled }) => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${searchTerm}`)
  }

  return (
    <form className="relative flex-1 flex gap-2 h-[36px] md:h-[40px] search_bar text-gray-300 focus-within:text-gray-200 pl-[15px]" onSubmit={handleSubmit}>
      <input
        type="search"
        id="search-field"
        name="search-field"
        autoComplete="off"
        placeholder="Search"
        onChange={(e) => { setSearchTerm(e.target.value) }}
        className={`flex-1 border-none outline-none placeholder-gray-300 rounded-[20px] text-white text-xs lg:text-sm p-2 pl-4 w-full max-w-[400px] backdrop-blur-lg bg-zinc-800/80 border ${!scrolled ? 'shadow shadow-black/30 border-transparent' : 'border-white/5'}`}
      />
      <button className={`flex items-center justify-center h-[36px] md:h-[40px] aspect-square bg-zinc-800 rounded-[20px] opacity-80 transition-opacity hover:opacity-100 crusor-pointer backdrop-blur-lg border ${!scrolled ? 'shadow shadow-black/30 border-transparent' : 'border-white/5'}`}>
        <FiSearch size={18} />
      </button>
    </form>
  )
}
  
export default Searchbar;
