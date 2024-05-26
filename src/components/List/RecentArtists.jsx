import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'

import { ArtistCard } from '../Cards'
import { Error } from '../LoadersAndError' 
import SeeMore from './SeeMore'

const RecentArtists = ({ artists, isFetching, error }) => {
    return (
        <div>
        <div className="=mt-4 flex justify-between items-end">
            <h3 className="text-white font-bold text-xl">Popular artists</h3>
            <SeeMore link="/charts?type=artists" />
        </div>
        {
            error ?
            <Error title="Could not load artists" /> :
            <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                freeMode
                // centeredSlides
                // centeredSlidesBounds
                modules={{FreeMode}}
                className="mt-3 mb-5 p-[20px] max-w-[95vw] lg:max-w-[calc(100vw-360px)]"
            >
                {
                    isFetching ?
                    [1, 1, 1, 1, 1, 1, 1, 1].map( (elem, i) => 
                        <SwiperSlide key={i} style={{width: '150px', height: 'auto'}}>
                            <div className="rounded-lg bg-white/5 loading-animation p-2">
                                <div className="rounded-md mb-2 aspect-square bg-black/50"></div>
                                <div className="h-3 w-[60%] bg-black/50 rounded-md"></div>
                            </div>
                        </SwiperSlide> 
                    ) :
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
        }
        </div>
    )
}

export default RecentArtists
