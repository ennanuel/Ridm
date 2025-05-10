import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import { Library } from '../components/List'
import { useEffect } from 'react'
import { MdArrowBack, MdOutlineAlbum, MdOutlineAudiotrack, MdOutlineRadio, MdPersonOutline, MdQueueMusic } from 'react-icons/md'
import { FaGuitar } from 'react-icons/fa'

const Blacklist = () => {
  const { blacklist } = useSelector(state => state.library);

  useEffect(() => {
    document.getElementById('site_title').innerText = 'Ridm - Blacklist'
  }, [])

  return (
    <div className="mt-[-60px] min-h-[90vh] flex flex-col">
      <div className="bg-red-500/5 h-[20%] flex flex-col gap-8 justify-between items-start p-4 min-h-[30vh] mt-[70px] mx-0 md:mx-4 my-4 border border-white/5 rounded-[20px] shadow-lg shadow-black/50">
        <div className="flex items-center gap-2 text-white">
          <Link to="/playlists" className="flex items-center justify-center w-10 aspect-square rounded-full hover:bg-white/5">
            <MdArrowBack size={25} />
          </Link>
          <h1 className="text-2xl font-bold mt-[1px]">Blacklist</h1>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          {
            Object.entries(blacklist).map(([key, value]) => (
              <a href={`#${key}`} className="rounded-full h-8 md:h-9 flex items-center justify-center gap-3 pl-2 sm:pl-4 pr-4 py-1 bg-white/5 text-gray-300 font-semibold text-sm hover:bg-white/10 hover:border-transparent">
                {
                  key === 'artists' ?
                    <MdPersonOutline size={20} /> :
                    key === 'tracks' ?
                      <MdOutlineAudiotrack size={20} /> :
                      key === 'albums' ?
                        <MdOutlineAlbum size={20} /> :
                        key === 'radios' ?
                          <MdOutlineRadio size={20} /> :
                          <MdQueueMusic size={20} />
                }
                <span>{value.length} {value.length === 1 ? key.substring(0, key.length - 1) : key}</span>
              </a>
            ))
          }
        </div>
      </div>
      {
        Object.entries(blacklist).some(([entry, value], i) => value.length > 0) ?
          <div className="p-2 md:p-4 flex flex-col gap-8">
            <Library noFilter={true} library={blacklist} />
          </div> :
          <div className="p-4 pt-10 flex flex-col items-center justify-center gap-4 flex-1">
            <h3 className="text-white/60 font-bold text-xl">There is Nothing here.</h3>
            <Link to='/' className="px-4 sm:px-6 h-9 md:h-10 rounded-full flex items-center justify-center bg-gray-200 text-black text-xs md:text-sm font-bold transition-[background-color] hover:bg-gray-300">
              Go Home
            </Link>
          </div>
      }
    </div>
  )
}

export default Blacklist
