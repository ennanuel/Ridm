import { useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'

import { Library } from '../components/List'

const Favorites = () => {
  const { favorites, blacklist } = useSelector( state => state.library )
  const navigate = useNavigate()

  return (
    <div className="p-4 flex flex-col h-[100vh]">
      <div className="flex justify-between items-center mb-6 lg:mt-[60px]">
        <h3 className=" text-white font-bold text-xl">Favorites</h3>
      </div>
      {
        Object.entries(favorites).some( ([entry, value], i) => value.length > 0 ) ?
        <Library library={favorites} favorites={favorites} blacklist={blacklist} /> :
        <div className="p-4 pt-10 flex-1 flex flex-col items-center justify-center gap-4">
          <h3 className="text-gray-400 font-bold text-xl">You haven't liked anything yet.</h3>
          <button 
            onClick={() => navigate('/')}
            className="px-4 py-2 rounded-md border-2 border-gray-400 text-gray-400 text-sm font-bold transition-[background-color] hover:bg-gray-400 hover:text-black"
          >
            Go Home
          </button>
        </div>
      }
    </div>
  )
}

export default Favorites
