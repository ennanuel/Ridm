import { MdClose } from "react-icons/md"

const PlaylistGenres = ({ playlistGenres, setNewPlaylist, genres, isLoading, error, genreNum }) => {
    return (
        <>
            <h2 className="text-white text-lg font-bold mt-4">Genres</h2>
            <div className="flex flex-row flex-wrap gap-3 mt-2">
                {
                    playlistGenres.map((genre, i) =>
                        <button
                            onClick={() => setNewPlaylist({ payload: genre.id, type: 'REMOVEGENRE' })}
                            key={i} type="button"
                            className="px-3 h-[30px] pr-2 rounded-md bg-gray-400 text-black text-sm flex items-center justify-center gap-1"
                        >
                            <span>{genre.name}</span>
                            <MdClose />
                        </button>)
                }
                {
                    !(isLoading && error) &&
                    genres.slice(0, genreNum || 10000000).filter(genre => playlistGenres.every(elem => elem.id !== genre.id)).map((genre, i) =>
                        <button
                            onClick={() => setNewPlaylist({ payload: genre, type: 'ADDGENRE' })}
                            key={i} type="button"
                            style={{ animationDelay: (i / 100 + 's'), animationFillMode: 'forwards' }}
                            className="animate-slideleft px-3 h-[30px] pr-2 rounded-md flex items-center justify-center bg-white/5 text-gray-200 opacity-0 text-sm hover:bg-white/10"
                        >
                            {genre.name}
                        </button>
                    )
                }
                {
                    genres?.length > 0 &&
                    <button
                        type="button"
                        onClick={() => setNewPlaylist({ type: genreNum === 5 ? 'MOREGENRES' : 'LESSGENRES' })}
                        className="text-gray-400 text-sm font-bold px-3 h-[30px] pr-2 rounded-md flex items-center justify-center"
                    >
                        {genreNum === 5 ? 'more' : 'less'}
                    </button>
                }
            </div>
        </>
    )
}

export default PlaylistGenres
