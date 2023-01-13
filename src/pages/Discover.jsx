import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error, Loader, SongCard } from "../components"
import { useGetTopGenresQuery, useGetTopGenreTracksQuery } from "../redux/services/DeezerApi";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
    const { activeSong, isPlaying, genreListId } = useSelector( (state) => state.player )
    const dispatch = useDispatch()
    const { data: tracks, isFetching: isFetchingTracks, error: fetchingTracksError } = useGetTopGenreTracksQuery( genreListId || 0 )
    const [{genreTitle, genreId}, setGenre] = useState({})
    const { data: genres } = useGetTopGenresQuery()

    if (isFetchingTracks) return <Loader title="Loading songs..." />;

    if (fetchingTracksError) return <Error />;

    return (
        <div className="flex flex-col">
            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
                <h2 className="font-bold text-3xl text-white">Discover {genreTitle || 'Pop'}</h2>
                <select
                    onChange={(e) => {
                        setGenre({
                            genreTitle: e.target.value.replace(/[0-9]+/, ''),
                            genreId: e.target.value.match(/[0-9]+/)
                        })
                        dispatch(selectGenreListId(genreId && genreId[0]))
                        console.log(genreListId)
                    }}
                    className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
                >
                    {genres?.data.map((genre, i) => i > 0 && <option key={genre.id} value={genre.id + genre.name}>{genre.name}</option>)}
                </select>
            </div>

            <div className="flex flex-wrap sm:justify-start justify-center gap-8">
                {tracks?.tracks?.data.map((song, i) => {
                    return <SongCard
                        key={song.id}
                        song={song}
                        activeSong={activeSong}
                        isPlaying={isPlaying}
                        i={i}
                        tracks={tracks.tracks}
                    />
                })}
            </div>
        </div>
    )
};

export default Discover;
