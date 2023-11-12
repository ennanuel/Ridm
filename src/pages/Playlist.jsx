import { useEffect, useReducer, useState } from 'react'

import { Link, useNavigate, useSearchParams } from 'react-router-dom'

import { useSelector } from 'react-redux'

import { useGetTopGenresQuery } from '../redux/services/DeezerApi'

import CreatePlaylist from '../components/CreatePlaylist'
import { Options } from '../components/Options'
import { Playlists } from '../components/List'

import { fetchSuggestedSongs } from '../utils/fetchData'
import { createNewPlaylist, playlistDispatch, playlistState } from '../utils/library'
import { displayMessage } from '../utils/prompt'

const Playlist = () => {
  const { playlists } = useSelector((state) => state.library);
  const { data: genres, isFetching, error } = useGetTopGenresQuery();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [newPlaylist, setNewPlaylist] = useReducer(playlistDispatch, playlistState);

  const handleSubmit = (e) => {
    e.preventDefault()
    const { playlistInfo } = newPlaylist;
    if(playlistInfo.name) {
      createNewPlaylist(playlistInfo);
      displayMessage('New playlist created!');
      setNewPlaylist({ type: 'RESET' });
      navigate('/playlists');
    } else {
      displayMessage('Song title is empty.');
    }
  }

  useEffect(() => { 
    if (!genres) return;
    setNewPlaylist({ type: 'SETGENRES', payload: genres.data });
  }, [genres])

  useEffect(() => {
    if(newPlaylist.genreAction === 'remove') {
      const id = newPlaylist.genreAction.id
      setNewPlaylist({type: 'REMOVESUGGESTEDSONG', payload: id})
    }

    if(newPlaylist.genreAction === 'add') {
      const id = newPlaylist.genreAction.id;
      const suggestedSongsIds = newPlaylist.suggestedSongs.map( song => song.id );
      fetchSuggestedSongs({ id, setNewPlaylist, suggestedSongsIds })
        .then(songs => setNewPlaylist({ type: 'ADDSUGGESTEDSONG', payload: songs }))
        .catch((error) => console.error(error));
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
          <Options type="playlists" navigate={navigate} />
        </div>
        {
          playlists.length < 1 ? 
            <div className="mt-[-40px] flex flex-col items-center justify-center gap-4 h-[90vh]">
              <h3 className="text-gray-400 font-bold text-xl">You don't have any saved playlists</h3>
              <Link to="/playlists?add=true" className="flex items-center justify-center font-bold text-xs md:text-sm bg-gray-400 text-black border border-gray-400 px-3 h-[28px] md:h-[36px] rounded-[18px] hover:text-gray-400 hover:bg-transparent transition-[background-color]">Create New</Link>
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
