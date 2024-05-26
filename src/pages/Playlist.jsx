import { useEffect, useMemo, useReducer, useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetTopGenresQuery } from '../redux/services/DeezerApi';

import CreatePlaylist from '../components/CreatePlaylist';

import { fetchSuggestedSongs } from '../utils/fetchData'
import { createNewPlaylist, playlistDispatch, playlistState } from '../utils/library'
import PlaylistsFront from '../components/PlaylistsFront'

const Playlist = () => {
  const { data: genres, isFetching, error } = useGetTopGenresQuery();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [newPlaylist, setNewPlaylist] = useReducer(playlistDispatch, playlistState);
  const isInAddPage = useMemo(() => params.get('add') === 'true', [params]);
  const [errorSavingPlaylist, setErrorSavingPlaylist] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { playlistInfo } = newPlaylist;
      await createNewPlaylist(playlistInfo);
      setNewPlaylist({ type: 'RESET' });
      navigate('/playlists');
    } catch (error) {
      setErrorSavingPlaylist(true);
    }
  }

  const handleChange = (e) => {
    setNewPlaylist({ type: 'HANDLECHANGE', id: e.target.id, payload: e.target.value });
    setErrorSavingPlaylist(setErrorSavingPlaylist(false));
  }

  useEffect(() => { 
    if (!genres) return;
    setNewPlaylist({ type: 'SETGENRES', payload: genres.data });
  }, [genres])

  useEffect(() => {
    if (newPlaylist.genreAction === 'remove') {
      const id = newPlaylist.genreAction.id
      setNewPlaylist({ type: 'REMOVESUGGESTEDSONG', payload: id })
    }
    if (newPlaylist.genreAction === 'add') {
      const id = newPlaylist.genreAction.id;
      const suggestedSongsIds = newPlaylist.suggestedSongs.map(song => song.id);
      fetchSuggestedSongs({ id, setNewPlaylist, suggestedSongsIds })
        .then(songs => setNewPlaylist({ type: 'ADDSUGGESTEDSONG', payload: songs }))
        .catch((error) => console.error(error));
    }
  }, [newPlaylist.genreAction])

  useEffect(() => {
    const text = `Ridm - ${isInAddPage ? 'Create New Playlist' : 'Playlists'}`
    document.getElementById('site_title').innerText = text
  }, [params])

  return (
    <div className={`px-2 flex md:px-4 overflow-x-clip ${!isInAddPage ? 'overflow-y-hidden' : ''}`}>
      <PlaylistsFront isInAddPage={isInAddPage} />
      <CreatePlaylist
        handleSubmit={handleSubmit}
        isInAddPage={isInAddPage}
        playlistInfo={newPlaylist.playlistInfo}
        setNewPlaylist={setNewPlaylist}
        handleChange={handleChange}
        genres={genres}
        isFetching={isFetching}
        error={error}
        genreNum={newPlaylist.genreNum}
        suggestedSongs={newPlaylist.suggestedSongs}
        errorSavingPlaylist={errorSavingPlaylist}
      />
    </div>
  )
}

export default Playlist
