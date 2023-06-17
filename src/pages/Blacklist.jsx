import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { Library } from '../components/List'

const Blacklist = () => {
  const {blacklist} = useSelector( state => state.library )

  return (
    <div className="h-[100vh] bg-gradient-to-b from-[#64000020] to-black/50">
        <section className="bg-[#64000020] shadow-lg shadow-black/80 h-[20%] flex items-end justify-start py-4 px-10"> 
            <h1 className="text-2xl uppercase font-bold text-white">Blacklist</h1>
        </section>
      {
        Object.entries(blacklist).some( ([entry, value], i) => value.length > 0 ) ?
        <Library library={blacklist} blacklist={{}} favorites={{}} /> : 
        <div className="p-4 pt-10 h-[70%] flex flex-col items-center justify-center gap-4">
          <h3 className="text-gray-400 font-bold text-xl">There is Nothing here.</h3>
          <Link to='/'>
              <p
              className="px-4 py-2 rounded-md border-2 border-gray-400 text-gray-400 text-sm font-bold transition-[background-color] hover:bg-gray-400 hover:text-black"
              >
              Go Home
              </p>
          </Link>
        </div>
      }
    </div>
  )
}

export default Blacklist
