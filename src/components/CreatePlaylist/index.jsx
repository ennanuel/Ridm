import Recommended from './Recommended'
import PlaylistSongs from './PlaylistSongs'
import PlaylistGenres from './PlaylistGenres'
import Details from './Details'
import Header from './Header'

const index = ({ setNewPlaylist, handleSubmit, params, playlistInfo, handleChange, genres, isLoading, error, genreNum, suggestedSongs, removeSong, addSong}) => {
  return (
    <form onSubmit={handleSubmit} className={`absolute p-6 pt-[60px] top-0 left-[100%] w-full h-[100vh] transition-transform ${params.get('add') === 'true' ? 'translate-x-[-100%]' : 'overflow-clip'}`}>
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

      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-6 mt-4 pb-[30px]">
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
