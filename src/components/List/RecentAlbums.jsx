import RecentAlbumCard from "../Cards/RecentAlbumCard"

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import SeeMore from "./SeeMore"

const RecentAlbums = ({ albums, isFetching, error }) => {
  return (
    <>
    <div className="flex items-end justify-between">
      <h3 className="text-white font-bold text-xl">Recent albums</h3>
      <SeeMore link="/charts?type=albums" />
    </div>
    <Swiper
        slidesPerView="auto"
        spaceBetween={15}
        freeMode
        // centeredSlides
        // centeredSlidesBounds
        modules={{FreeMode}}
        className="mt-4 p-[20px] max-w-[95vw] lg:max-w-[calc(100vw-300px)]"
        >
        {
          isFetching ?
          [1, 1, 1, 1, 1, 1, 1].map( (elem, i) =>
            <SwiperSlide
                key={i}
                style={{width: '200px', height: 'auto'}}
            >
              <div className="h-[120px] rounded-lg bg-white/5 loading-animation flex flex-col justify-center p-2 gap-2">
                <div className="h-4 bg-black/50 rounded-md w-[80%]"></div>
                <div className="h-3 bg-black/50 rounded-md w-[50%]"></div>
              </div>
            </SwiperSlide>
          ) :
          albums?.slice(0, 10)?.map( (album, i) => (
            <SwiperSlide
                key={album?.id}
                style={{width: '200px', height: 'auto'}}
                className="shadow-lg rounded-md animate-slideright transition-colors hover:bg-white/10"
            >
                <RecentAlbumCard i={i} album={album} />
            </SwiperSlide>
          ))
        }
    </Swiper>
    </>
  )
}

export default RecentAlbums
