import { Link } from "react-router-dom"

import { Albums, Artists, Songs, Radios } from "../components/List"
import { Error, Loader } from "../components/LoadersAndError";

import { useGetRecentReleasesQuery, useGetTopRadiosQuery, useGetTopChartQuery } from "../redux/services/DeezerApi";

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'

const Discover = () => {
    const { data: radios, isFetching, error } = useGetTopRadiosQuery()
    const { data: recentAlbums, isFetching: isFetchingRecentAlbums, error: errorFetchingRecentAlbums } = useGetRecentReleasesQuery( 0 )
    const { data, isFetching: isFetchingTopCharts, error: errorFetchingTopCharts } = useGetTopChartQuery( 0 )
    const topPlays = data?.tracks?.data?.slice(0, 9)
    const topArtists = data?.artists?.data?.slice(0, 10)



    return (
        <div className="lg:mt-[70px] mt-4 flex flex-col px-4">
            <Albums 
                isFetching={isFetchingRecentAlbums} 
                error={errorFetchingRecentAlbums} 
                albums={recentAlbums?.data?.slice(0, 5)}
                showSort={true}
            >
                Popular Albums
            </Albums>

            <Songs 
                isFetching={isFetchingTopCharts} 
                error={errorFetchingTopCharts} 
                songs={topPlays}
            >
                Popular Songs
            </Songs>

            <Artists 
                artists={topArtists}
                isFetching={isFetchingTopCharts}
                error={errorFetchingTopCharts}
            >
                Popular Artists
            </Artists>

            <Radios 
                isFetching={isFetching} 
                error={error} 
                radios={radios?.data?.slice(0, 5)}
            >
                Popular Radios
            </Radios>
            {/* <Swiper
                slidesPerView="auto"
                spaceBetween={15}
                freeMode
                centeredSlides
                centeredSlidesBounds
                modules={{FreeMode}}
                className="mt-4 p-[20px]"
                >
                {
                    topArtists?.map( (artist, i) => (
                    <SwiperSlide
                        key={artist?.id}
                        style={{ width: '20%', height: 'auto' }}
                        className="shadow-lg rounded-md animate-slideright p-4 bg-white/5 transition-colors hover:bg-white/10"
                    >
                        <Link to={`/artists/${artist?.id}`}>
                        <img src={artist['picture_medium']} className="rounded-full w-full object-cover shadow-lg shadow-black/50 mb-2" alt="artist image" />
                        <p className="text-sm font-bold text-gray-400">artist</p>
                        <h4 className="font-semibold text-gray-200">{artist.name}</h4>
                        </Link>
                    </SwiperSlide>
                    ) )
                }
            </Swiper> */}
        </div>
    )
};

export default Discover;
