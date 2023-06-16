import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`/search/${searchTerm}`)
  }

  return (
    <form autoComplete="off" className="relative search_bar text-gray-300 focus-within:text-gray-200 py-[10px] pl-[15px]" onSubmit={handleSubmit}>
      <div className="flex flex-row justify-start items-center gap-2">
        <input 
          type="search" 
          id="search-field" 
          name="search-field" 
          autoComplete="off" 
          placeholder="Search"
          onChange={(e) => {setSearchTerm(e.target.value)}}
          className="flex-1 border-none outline-none placeholder-gray-300 rounded-md text-white text-sm p-2 backdrop-blur-lg shadow-md shadow-black/30"
         />
         <button className="flex flex-row justify-center-items-center p-2 bg-white/10 rounded-md opacity-80 transition-opacity hover:opacity-100 crusor-pointer backdrop-blur-lg shadow-md shadow-black/30">
          <FiSearch className="w-5 h-5" />
         </button>
      </div>
    </form>
  )
}
  
export default Searchbar;
