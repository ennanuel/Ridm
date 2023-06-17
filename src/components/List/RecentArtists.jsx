import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'

import { ArtistCard } from '../Cards'
import SeeMore from './SeeMore'

const RecentArtists = ({ artists }) => {
    return (
        <>
        <div className="mt-8 flex justify-between items-end">
            <h3 className="text-white font-bold text-xl">Popular artists</h3>
            <SeeMore link="/charts?type=artists" />
        </div>
        <Swiper
            slidesPerView="auto"
            spaceBetween={15}
            freeMode
            // centeredSlides
            // centeredSlidesBounds
            modules={{FreeMode}}
            className="mt-3 mb-5 p-[20px] max-w-[95vw] lg:max-w-[calc(100vw-300px)]"
        >
            {
                artists?.map( (artist, i) => (
                <SwiperSlide
                    key={artist?.id}
                    style={{width: '150px', height: 'auto'}}
                    className="shadow-lg rounded-md animate-slideright transition-colors hover:bg-white/10"
                >
                    <ArtistCard artist={artist} i={i} />
                </SwiperSlide>
                ) )
            }
        </Swiper>
        </>
    )
}

export default RecentArtists
