import { useEffect, useReducer, useState } from 'react'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import { useGetTopGenresQuery } from '../redux/services/DeezerApi'

import CreatePlaylist from '../components/CreatePlaylist'
import { Options } from '../components/Options'
import { Playlists } from '../components/List'

import { fetchSuggestedSongs } from '../functions/fetchData'
import { createNewPlaylist, playlistDispatch } from '../functions/library'
import { displayMessage } from '../functions/prompt'

const Playlist = () => {
  const { data: genres, isFetching, error } = useGetTopGenresQuery()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [params, setParams] = useSearchParams()

  const { playlists, favorites, blacklist } = useSelector( (state) => state.library )

  const [newPlaylist, setNewPlaylist] = useReducer(playlistDispatch, {genreNum: 5, playlistInfo: {name: '', img: '', genres: [], tracks: []}, suggestedSongs: [], genreAction: {action: '', id: null}})

  const handleSubmit = (e) => {
    e.preventDefault()
    if(newPlaylist.playlistInfo.name !== "") {
      createNewPlaylist(dispatch, newPlaylist.playlistInfo)
      displayMessage(dispatch, 'New playlist created!')
      
      setNewPlaylist({type: 'RESET'})
      navigate('/playlists')
    } else {
      displayMessage(dispatch, 'Song title is empty.')
    }
  }

  useEffect(() => {

    if(newPlaylist.genreAction === 'remove') {
      const id = newPlaylist.genreAction.id
      setNewPlaylist({type: 'REMOVESUGGESTEDSONG', payload: id})
    }
    if(newPlaylist.genreAction === 'add') {
      const id = newPlaylist.genreAction.id
      const suggestedSongs = newPlaylist.suggestedSongs
      fetchSuggestedSongs({id, setNewPlaylist, suggestedSongs, blacklist , favorites})
    }

  }, [newPlaylist.genreAction])

  useEffect(() => {
    const text = `Ridm - ${params.get('add') == 'true' ? 'Create New Playlist' : 'Playlists'}`
    document.getElementById('site_title').innerText = text
  }, [params])

  return (
    <div className={`p-2 flex md:p-4 overflow-x-clip ${!params.get('add') === 'true' ? 'overflow-y-hidden' : ''}`}>
      <div className={`min-w-full transition-transform ${params.get('add') === 'true' && 'translate-x-[-110%]'}`}>
        <div className="w-full flex justify-between items-center mb-4">
          <h3 className="font-bold text-white text-xl">Playlists</h3>
          <Options type="playlists" navigate={navigate} small={true} />
        </div>
        {
          playlists.length < 1 ? 
            <div className="mt-[-40px] flex flex-col items-center justify-center gap-4 h-[90vh]">
              <h3 className="text-gray-300 font-bold text-xl">You don't have any saved playlists</h3>
              <Link to="/playlists?add=true" className="flex items-center justify-center font-bold text-xs md:text-sm text-black bg-gray-300 border border-gray-300 px-2 md:px-3 h-[30px] md:h-[40px] rounded-[25px] hover:text-gray-300 hover:bg-transparent transition-[background-color]">Create New</Link>
            </div> :
          <Playlists playlists={playlists} />
        }
      </div>
      
      <CreatePlaylist
        handleSubmit={handleSubmit}
        params={params}
        playlistInfo={newPlaylist.playlistInfo}
        setNewPlaylist={setNewPlaylist}
        handleChange={(e) => setNewPlaylist({type: 'HANDLECHANGE', id: e.target.id, payload: e.target.value})}
        genres={genres}
        isFetching={isFetching}
        error={error}
        genreNum={newPlaylist.genreNum}
        suggestedSongs={newPlaylist.suggestedSongs}
      />
    </div>
  )
}

export default Playlist
