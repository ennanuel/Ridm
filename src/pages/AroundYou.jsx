import { useSelector } from "react-redux";
import { Loader, Error } from "../components";
import { useGetTopGenreTracksQuery, useGetCountryInfoQuery } from "../redux/services/DeezerApi";
import { SongCard } from '../components'

const AroundYou = () => {
    const { isPlaying, activeSong } = useSelector( state => state.player )
    const { data, isFetching, error } = useGetTopGenreTracksQuery()
    const { data: countryInfo } = useGetCountryInfoQuery()

    if(isFetching) return <Loader title="Loading songs around you" />

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Around You, <span className="font-black">{ countryInfo?.country }({ countryInfo.country_iso })</span></h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.tracks.data.map( (song, i) => 
                    <SongCard 
                        key={song.id}
                        song={song}
                        isPlaying={isPlaying}
                        activeSong={activeSong}
                        tracks={data.tracks}
                        i={i}
                    />)}
            </div>
        </div>
    )
};

export default AroundYou;
