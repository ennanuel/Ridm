import { useSelector } from "react-redux";
import { Loader, Error } from "../components";
import { useGetTopChartQuery } from "../redux/services/DeezerApi";
import { SongCard } from '../components'

const TopCharts = () => {
    const { isPlaying, activeSong } = useSelector( state => state.player )
    const { data, isFetching, error } = useGetTopChartQuery()

    if(isFetching) return <Loader title="Loading top charts" />

    if(error) return <Error />

    return (
        <div className="flex flex-col">
            <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top Charts</h2>

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

export default TopCharts;
