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
    <div className={`p-2 mg:p-4 pt-[80px] relative overflow-x-clip ${!params.get('add') === 'true' ? 'overflow-y-hidden' : ''} h-[100vh]`}>
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
