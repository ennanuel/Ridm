import { useEffect, useRef } from "react"
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import PlayPause from "./PlayPause"
import { playPause, setActiveSong } from "../redux/features/playerSlice"
import { useGetTopChartQuery } from "../redux/services/DeezerApi"

import 'swiper/css'
import 'swiper/css/free-mode'

const TopPlay = () => {
  const dispatch = useDispatch()
  const { activeSong, isPlaying } = useSelector( (store) => store.player )
  const { data } = useGetTopChartQuery( 'tracks' )
  const divRef = useRef(null)
  const topPlays = data?.data.slice(0, 5)
  const topArtists = data?.data.map( song => song.artist ).slice(0, 5)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }
  const handlePlayClick = (song, i, tracks) => {
    dispatch(setActiveSong({ song, tracks, i}))
    dispatch(playPause(true))
  }

  useEffect(() => {
    divRef.current.scrollIntoView({ behaviour: 'smooth' })
  })

  const TopChartsCard = ({ song, i, isPlaying, activeSong, handlePlayClick, handlePauseClick }) => (
    <div className="w-full flex flex-row items-center hover-bg-[#4c426e] py-2 rounded-lg cursor-pointer mb-2">
      <h3 className="font-bold text-base text-white mr-3">
        {i + 1}
      </h3>
      <div className="flex-1 flex flex-row justify-between">
        <img className="w-20 h-20 rounded-lg" src={song.album['cover']} alt={song.title} />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song.id}`}>
            <p className="text-xl font-bold text-white">{song?.title}</p>
          </Link>
          <Link to={`/artists/${song.artist.id}`}>
            <p className="text-base font-bold text-gray-300 mt-1">{song?.artist.name}</p>
          </Link>
        </div>
      </div>

      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={() => handlePauseClick()}
        handlePlay={() => handlePlayClick(song, i, data)}
      />
    </div>
  )

  return (
    <div ref={divRef}className="xl:ml-6 xl:mb-0 mb-6 flex-1 xl:max-w-[500px] flex flex-col">
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Charts</h2>

          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {
            topPlays?.map( (song, i) => 
            <TopChartsCard 
              song={song} 
              i={i} 
              key={song.id} 
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            /> 
          )}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8"> 
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl">Top Artists</h2>

          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See More</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={{FreeMode}}
          className="mt-4"
        >
          {
            topArtists?.map( (artist, i) => (
              <SwiperSlide
                key={artist?.id}
                style={{ width: '25%', height: 'auto' }}
                className="shadow-lg rounded-full animate-slideright"
              >
                <Link to={`/artists/${artist?.id}`}>
                  <img src={artist['picture_medium']} className="rounded-full w-full object-cover" alt="artist image" />
                </Link>
              </SwiperSlide>
            ) )
          }
        </Swiper>
      </div>
    </div>
  )
}

export default TopPlay;
