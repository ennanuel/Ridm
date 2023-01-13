import { Loader, Error } from "../components";
import { useGetTopChartQuery } from "../redux/services/DeezerApi";
import { ArtistCard } from '../components'

const AroundYou = () => {
    const { data, isFetching, error } = useGetTopChartQuery(  )

    if(isFetching) return <Loader title="Loading top charts" />

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Artists</h2>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {data?.artists.data.map( (artist, i) => 
                    <ArtistCard 
                        artist={artist}
                        key={artist.id}
                        i={i}
                    />)}
            </div>
        </div>
    )
};

export default AroundYou;
