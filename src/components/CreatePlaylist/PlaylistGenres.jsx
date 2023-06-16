import { MdAdd } from "react-icons/md"

const PlaylistGenres = ({ playlistGenres, genres, handleGenre, isLoading, error, genreNum, setGenreNum }) => {
    return (
        <>
            <h2 className="text-white text-lg font-bold mt-4">Genres</h2>

            <div className="flex flex-row flex-wrap gap-3 mt-2">
            {
                playlistGenres.map( (genre, i) =>
                <button onClick={() => handleGenre(genre, 'remove')} key={i} type="button" className="px-2 py-1 pr-1 rounded-sm bg-gray-400 text-black text-sm flex items-center justify-center gap-1">
                <span>{genre.name}</span>
                <span className="flex items-center justify-center rotate-45"><MdAdd /></span>
                </button>)
            }
            {
                !(isLoading && error) &&
                genres.slice(0, genreNum || 10000000).filter(genre => playlistGenres.every( elem => elem.id !== genre.id )).map( (genre, i) =>
                <button 
                    onClick={() => handleGenre(genre, 'add')} 
                    key={i} type="button" 
                    style={{animationDelay: (i/100 + 's'), animationFillMode: 'forwards'}} 
                    className="animate-slideleft px-2 py-1 rounded-sm bg-white/5 text-gray-200 opacity-0 text-sm hover:bg-white/10"
                >
                    {genre.name}
                </button>
                )
            }  
            {
                genres &&
                <button 
                    type="button"
                    onClick={() => setGenreNum( prev => prev === 5 ? null : 5 ) } 
                    className="text-gray-400 text-sm font-bold"
                >
                    { genreNum === 5 ? 'more' : 'less' }
                </button>
            }
            </div>
        </>
    )
}

export default PlaylistGenres
