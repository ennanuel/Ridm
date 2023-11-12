import { deletePlaylist, removeSongsFromPlaylist, addToFavorites, deleteFromFavorites, addToBlacklist, deleteFromBlacklist, createPlaylist, editPlaylist, setLibraryStorage } from "../redux/features/librarySlice";
import { hidePrompt } from "../redux/features/promptSlice";
import { displayMessage } from "./prompt";
import { store } from '../redux/store';

export const createNewPlaylist = (data) => {
  const playlistId = data.name + Math.floor(Math.random() * 100000);
  store.dispatch(createPlaylist({ ...data, playlistId }));
  displayMessage('Playlist created!');
  store.dispatch(setLibraryStorage());
}

export const editCurrentPlaylist = (values) => {
  store.dispatch(editPlaylist(values));
  store.dispatch(hidePrompt());
  store.dispatch(setLibraryStorage());
}

export const removeFromPlaylist = (data) => {
  store.dispatch(removeSongsFromPlaylist(data));
  store.dispatch(hidePrompt());
  store.dispatch(setLibraryStorage());
}

export const deletePlaylists = (playlists) => {
  for(let playlist of playlists) {
    store.dispatch(deletePlaylist(playlist.id));
  }
  store.dispatch(hidePrompt())
  store.dispatch(setLibraryStorage())
}

export const addFavorites = (type, value) => {
  store.dispatch(addToFavorites({ type, value }));
  store.dispatch(setLibraryStorage());
}

export const removeFavorites = (type, id) => {
  store.dispatch(deleteFromFavorites({ type, id }));
  store.dispatch(setLibraryStorage());
}

export const addBlacklist = (type, value) => {
  store.dispatch(addToBlacklist({ type, value }));
  store.dispatch(hidePrompt());
  store.dispatch(setLibraryStorage());
}

export const removeBlacklist = (type, id) => {
  store.dispatch(deleteFromBlacklist({ type, id }));
  store.dispatch(setLibraryStorage());
}

export const playlistState = {
  genreNum: 5,
  playlistInfo: { name: '', img: '', genres: [], tracks: [] },
  suggestedSongs: [], genreAction: { action: '', id: null }
};

export const playlistDispatch = (state, action) => {
  const dispatchActions = {
    moregenres:  {...state, genreNum: null},
    lessgenres: { ...state, genreNum: 5 },
    handlechange: { ...state, playlistInfo: { ...state.playlistInfo, [action.id]: action.payload } },
    reset: playlistState,
    setgenres: { ...state, genres: action.payload },
    addgenre: {
      ...state,
      genreAction: 'add', id: action.payload.id,
      playlistInfo: { ...state.playlistInfo, genres: [...state.playlistInfo.genres, action.payload] }
    },
    removegenre: {
      ...state,
      genreAction: { action: 'remove', id: action.payload.id },
      playlistInfo: {
        ...state.playlistInfo,
        genres: state.playlistInfo.genres.filter(elem => elem.id !== action.payload)
      }
    },
    addsong: {
      ...state,
      playlistInfo: { ...state.playlistInfo, tracks: [...state.playlistInfo.tracks, action.payload] }
    },
    removesong: {
      ...state,
      playlistInfo: {
        ...state.playlistInfo,
        tracks: removedTracks = state.playlistInfo.tracks.filter(track => track.id !== action.payload.id)
      }
    },
    addsuggestedsong: { ...state, suggestedSongs: [...state.suggestedSongs, ...action.payload] },
    removesuggestedsong: { ...state, suggestedSongs: state.suggestedSongs.filter(song => song.genreid !== action.payload) },
  }
  const actionType = action.type.toLowerCase();
  return dispatchActions[actionType] || state;
}