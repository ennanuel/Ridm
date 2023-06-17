import { Albums, Artists, Songs, Radios } from "../components/List"

import { useGetRecentReleasesQuery, useGetTopRadiosQuery, useGetTopChartQuery } from "../redux/services/DeezerApi";

import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'
import { useSelector } from "react-redux";

const Discover = () => {
    const { blacklist, favorites } = useSelector( state => state.library )

    const { data: radios, isFetching, error } = useGetTopRadiosQuery()
    const { data: recentAlbums, isFetching: isFetchingRecentAlbums, error: errorFetchingRecentAlbums } = useGetRecentReleasesQuery( 0 )
    const { data, isFetching: isFetchingTopCharts, error: errorFetchingTopCharts } = useGetTopChartQuery( 0 )

    const topPlays = data?.tracks?.data?.slice(0, 9)
    const topArtists = data?.artists?.data?.slice(0, 10)



    return (
        <div className="lg:mt-[70px] mt-4 flex flex-col px-2 md:px-4">
            <Albums 
                isFetching={isFetchingRecentAlbums} 
                error={errorFetchingRecentAlbums} 
                albums={recentAlbums?.data?.slice(0, 5)}
                showSort={true}
                favorites={favorites}
                blacklist={blacklist}
            >
                Popular Albums
            </Albums>

            <Songs 
                isFetching={isFetchingTopCharts} 
                error={errorFetchingTopCharts} 
                songs={topPlays}
                favorites={favorites}
                blacklist={blacklist}
            >
                Popular Songs
            </Songs>

            <Artists 
                artists={topArtists}
                isFetching={isFetchingTopCharts}
                error={errorFetchingTopCharts}
                favorites={favorites}
                blacklist={blacklist}
            >
                Popular Artists
            </Artists>

            <Radios 
                isFetching={isFetching} 
                error={error} 
                radios={radios?.data?.slice(0, 5)}
                favorites={favorites}
                blacklist={blacklist}
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
