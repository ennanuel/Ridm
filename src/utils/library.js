import { deletePlaylist, removeSongsFromPlaylist, addToFavorites, deleteFromFavorites, addToBlacklist, deleteFromBlacklist, createPlaylist, editPlaylist, setLibraryStorage } from "../redux/features/librarySlice";
import { hidePrompt } from "../redux/features/promptSlice";
import { displayMessage } from "./prompt";
import { store } from '../redux/store';

export const createNewPlaylist = (data) => new Promise(
  function (resolve, reject) {
    if (data?.name) {
      const playlistId = Date.now();
      store.dispatch(createPlaylist({ ...data, id: playlistId }));
      displayMessage('Playlist created!');
      store.dispatch(setLibraryStorage());
      resolve();
    } else {
      displayMessage('Couldn\'t create playlist!');
      reject();
    }
  }
);

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
  playlistInfo: { id: '', name: '', img: '', genres: [], tracks: [] },
  suggestedSongs: [], genreAction: { action: '', id: null }
};
  
const dispatchActions = {
  moregenres: ({ state }) => ({ ...state, genreNum: null }),
  lessgenres: ({ state }) => ({ ...state, genreNum: 5 }),
  handlechange: ({ state, action }) => ({ ...state, playlistInfo: { ...state.playlistInfo, [action.id]: action.payload } }),
  reset: () => playlistState,
  setgenres: ({ state, action }) => ({ ...state, genres: action.payload }),
  addgenre: ({ state, action }) => ({
    ...state,
    genreAction: 'add', id: action.payload.id,
    playlistInfo: { ...state.playlistInfo, genres: [...state.playlistInfo.genres, action.payload] }
  }),
  removegenre: ({ state, action }) => ({
    ...state,
    genreAction: { action: 'remove', id: action.payload.id },
    playlistInfo: {
      ...state.playlistInfo,
      genres: state.playlistInfo.genres.filter(elem => elem.id !== action.payload)
    }
  }),
  addsong: ({ state, action }) => ({
    ...state,
    playlistInfo: { ...state.playlistInfo, tracks: [...state.playlistInfo.tracks, action.payload] }
  }),
  removesong: ({ state, action }) => ({
    ...state,
    playlistInfo: {
      ...state.playlistInfo,
      tracks: state.playlistInfo.tracks.filter(track => track.id !== action.payload.id)
    }
  }),
  addsuggestedsong: ({ state, action }) => ({ ...state, suggestedSongs: [...state.suggestedSongs, ...action.payload] }),
  removesuggestedsong: ({ state, action }) => ({ ...state, suggestedSongs: state.suggestedSongs.filter(song => song.genreid !== action.payload) }),
};

export const playlistDispatch = (state, action) => {
  const actionType = action.type.toLowerCase();
  const dispatchAction = dispatchActions[actionType]
  if (!dispatchAction) return state;
  return dispatchAction({ state, action });
}