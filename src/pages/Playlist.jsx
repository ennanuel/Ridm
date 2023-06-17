import { useState } from 'react'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { useGetTopGenresQuery } from '../redux/services/DeezerApi'

import CreatePlaylist from '../components/CreatePlaylist'
import { Options } from '../components/Options'
import { Playlists } from '../components/List'

import { fetchSuggestedSongs } from '../functions/fetchData'
import { createNewPlaylist } from '../functions/library'
import { displayMessage } from '../functions/prompt'

const Playlist = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [params, setParams] = useSearchParams()

  const { data: genres, isFetching, error } = useGetTopGenresQuery()

  const { playlists, favorites, blacklist } = useSelector( (state) => state.library )

  const [genreNum, setGenreNum] = useState(5);
  const [playlistInfo, setPlaylistInfo] = useState({name: '', img: '', genres: [], tracks: []})
  const [suggestedSongs, setSuggestedSongs] = useState([])

  const handleChange = (e) => {
    const id = e.target.getAttribute('id')
    setPlaylistInfo( (prev) => ({...prev, [id]: e.target.value}) )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(playlistInfo.name !== "") {
      createNewPlaylist(dispatch, playlistInfo)
      setParams({})
      displayMessage(dispatch, 'New playlist created!')
    
      setPlaylistInfo({img: '', name: '', tracks: [], genres: []})
      setSuggestedSongs([])
      setParams({})
    }
  }

  const suggestSongs = (genreid) => {
    fetchSuggestedSongs(genreid, setSuggestedSongs, blacklist, favorites)
  }

  const removeSuggestedSongs = (genreid) => {
    setSuggestedSongs( prev => {
      const tracks = [...prev]
      const newTracks = tracks.filter( song => song.genreid !== genreid )
      return newTracks;
    })
  }

  const handleGenre = (genre, action) => {
    setPlaylistInfo( prev => {
      let genres = [...prev.genres]
      if(action === 'add') {
        suggestSongs(genre.id)
        genres.push(genre)
      } else {
        removeSuggestedSongs(genre.id)
        genres = genres.filter( elem => elem.id !== genre.id )
      }
      return {...prev, genres}
    })
  }

  const addSong = (song) => {
    setPlaylistInfo( prev => ({...prev, tracks: [song, ...prev.tracks]}) )
  }

  const removeSong = (songid) => {
    const tracks = playlistInfo.tracks
    const newTracks = tracks.filter( track => track.id !== songid )
    setPlaylistInfo( prev => ({...prev, tracks: newTracks}) )
  }

  return (
    <div className={`p-6 lg:pt-[80px] relative overflow-x-clip ${!params.get('add') === 'true' ? 'overflow-y-hidden' : ''} h-[100vh]`}>
      <div className={`w-full h-full transition-transform ${params.get('add') === 'true' && 'translate-x-[-110%]'}`}>
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="font-bold text-white text-xl">Playlists</h3>
          <Options type="playlists" navigate={navigate} small={true} />
        </div>
        {
          playlists.length < 1 ? 
            <div className="h-full mt-[-40px] flex flex-col items-center justify-center gap-4">
              <h3 className="text-gray-400 font-bold text-xl">You don't have any saved playlists</h3>
              <Link to="/playlists?add=true" className="font-bold text-sm text-gray-400 border-2 border-gray-400 px-2 py-1 rounded-md hover:text-black hover:bg-gray-400 transition-[background-color]">Create New</Link>
            </div> :
          <Playlists playlists={playlists} />
        }
      </div>
      <CreatePlaylist
        handleSubmit={handleSubmit}
        params={params}
        playlistInfo={playlistInfo}
        handleChange={handleChange}
        genres={genres}
        handleGenre={handleGenre}
        isFetching={isFetching}
        error={error}
        genreNum={genreNum}
        setGenreNum={setGenreNum}
        suggestedSongs={suggestedSongs}
        removeSong={removeSong}
        addSong={addSong}
      />
    </div>
  )
}

export default Playlist
