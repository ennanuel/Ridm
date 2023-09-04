import Recommended from './Recommended'
import PlaylistSongs from './PlaylistSongs'
import PlaylistGenres from './PlaylistGenres'
import Details from './Details'
import Header from './Header'

const index = ({ setNewPlaylist, handleSubmit, params, playlistInfo, handleChange, genres, isLoading, error, genreNum, suggestedSongs, removeSong, addSong}) => {
  return (
    <form onSubmit={handleSubmit} className={`min-w-full min-h-[90vh] transition-[transform,opacity] ${params.get('add') === 'true' ? 'translate-x-[-100%]' : 'opacity-0 pointer-events-none h-0'}`}>
      <Header />

      <Details playlistInfo={playlistInfo} handleChange={handleChange} />
      
      <PlaylistGenres 
        playlistGenres={playlistInfo?.genres || []} 
        genres={genres?.data || []}
        isLoading={isLoading} 
        error={error} 
        genreNum={genreNum} 
        setNewPlaylist={setNewPlaylist}
      />

      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6 mt-4">
        {
          suggestedSongs.length > 0 &&
          <Recommended suggestedSongs={suggestedSongs} setNewPlaylist={setNewPlaylist} tracks={playlistInfo.tracks} />
        }
        {
          playlistInfo.tracks.length > 0 &&
          <PlaylistSongs tracks={playlistInfo.tracks} setNewPlaylist={setNewPlaylist} removeSong={removeSong} />
        }
      </div>
    </form>
  )
}

export default index
