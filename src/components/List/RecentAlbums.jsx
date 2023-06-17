import RecentAlbumCard from "../Cards/RecentAlbumCard"

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import SeeMore from "./SeeMore"

const RecentAlbums = ({ albums }) => {
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
            albums?.slice(0, 10)?.map( (album, i) => (
            <SwiperSlide
                key={album?.id}
                style={{width: '200px', height: 'auto'}}
                className="shadow-lg rounded-md animate-slideright transition-colors hover:bg-white/10"
            >
                <RecentAlbumCard i={i} album={album} />
            </SwiperSlide>
            ) )
        }
    </Swiper>
    </>
  )
}

export default RecentAlbums
