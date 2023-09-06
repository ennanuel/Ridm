import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { Library } from '../components/List'
import { useEffect } from 'react'

const Blacklist = () => {
  const { blacklist, favorites } = useSelector( state => state.library )
  console.log(blacklist)

  useEffect(() => {
    document.getElementById('site_title').innerText = 'Ridm - Blacklist'
  }, [])

  return (
    <div className="mt-[-60px] min-h-[90vh] bg-gradient-to-b from-[#4600008e] to-transparent flex flex-col">
        <section className="bg-[#64000020] shadow-lg shadow-black/80 h-[20%] flex items-end justify-start py-4 px-10 pt-[70px]"> 
            <h1 className="text-2xl font-bold text-white/50">Blacklist</h1>
        </section>
      {
        Object.entries(blacklist).some( ([entry, value], i) => value.length > 0 ) ?
        <div className="p-2 md:p-4">
          <Library noFilter={true} library={blacklist} blacklist={blacklist} favorites={favorites} /> 
        </div> : 
        <div className="p-4 pt-10 flex flex-col items-center justify-center gap-4 flex-1">
          <h3 className="text-white/60 font-bold text-xl">There is Nothing here.</h3>
          <Link to='/' className="px-4 h-[28px] md:h-[32px] rounded-[16px] flex items-center justify-center border border-white/60 bg-white/60 text-black text-xs md:text-sm font-bold transition-[background-color] hover:bg-transparent hover:text-white/60">
            Go Home
          </Link>
        </div>
      }
    </div>
  )
}

export default Blacklist
