import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { Library } from '../components/List'
import { useEffect, useState } from 'react'

const Favorites = () => {
  const { favorites, blacklist } = useSelector(state => state.library)

  useEffect(() => {
    document.getElementById('site_title').innerText = 'Ridm - Favorites'
  }, [])

  return (
    <div className="flex flex-col gap-6 bg-gradient-to-b from-slate-600/50 to-[transparent] to-[200px] min-h-[90vh]">
      <div className="p-4">
        {
          Object.entries(favorites).some( ([entry, value], i) => value.length > 0 ) ?
          <Library library={favorites} favorites={favorites} blacklist={blacklist} /> :
          <div className="p-4 flex-1 flex flex-col items-center justify-center gap-4">
            <h3 className="text-gray-400 font-bold text-xl">You haven't liked anything yet.</h3>
            <Link to="/"
              className="px-4 py-2 rounded-md border-2 border-gray-400 text-gray-400 text-sm font-bold transition-[background-color] hover:bg-gray-400 hover:text-black"
            >
              Go Home
            </Link>
          </div>
        }
      </div>
    </div>
  )
}

export default Favorites
