import { deletePlaylist, removeSongsFromPlaylist, addToFavorites, deleteFromFavorites, addToBlacklist, deleteFromBlacklist, createPlaylist, editPlaylist } from "../redux/features/librarySlice"
import { hidePrompt } from "../redux/features/promptSlice"
import { displayMessage } from "./prompt"

export const createNewPlaylist = (dispatch, data) => {
    const id = data.name + Math.floor(Math.random() * 100000)
    dispatch(createPlaylist({...data, id}))
    displayMessage(dispatch, 'Playlist created!')
}

export const editCurrentPlaylist = (dispatch, values) => {
    dispatch(editPlaylist(values))
    dispatch(hidePrompt())
}

export const removeFromPlaylist = (dispatch, data) => {
    dispatch(removeSongsFromPlaylist(data))
    dispatch(hidePrompt())
}

export const deletePlaylists = (dispatch, playlists) => {
    for(let playlist of playlists) {
        dispatch(deletePlaylist(playlist.id));
    }
    dispatch(hidePrompt())
}

export const addFavorites = (dispatch, type, value) => {
    dispatch(addToFavorites({type, value}))
}

export const removeFavorites = (dispatch, type, id) => {
    dispatch(deleteFromFavorites({type, id}))
}

export const addBlacklist = (dispatch, type, value) => {
    dispatch(addToBlacklist({type, value}))
    dispatch(hidePrompt())
}

export const removeBlacklist = (dispatch, type, id) => {
    dispatch(deleteFromBlacklist({type, id}))
}

export const playlistDispatch = (state, action) => {
  switch(action.type) {
    case 'MOREGENRES': 
      return {...state, genreNum: null};
    
    case 'LESSGENRES':
      return {...state, genreNum: 5};

    case 'HANDLECHANGE':
      return {...state, playlistInfo: {...state.playlistInfo, [action.id]: action.payload}};

    case 'RESET':
      return {playlistInfo: {name: '', img: '', genres: [], tracks: []}, genreNum: 5, suggestedSongs: []};

    case 'ADDGENRE':
      return {...state, playlistInfo: {...state.playlistInfo, genres: [...state.playlistInfo.genres, action.payload]}, genreAction: 'add', id: action.payload.id};

    case 'REMOVEGENRE':
      const removedGenres = state.playlistInfo.genres.filter( elem => elem.id !== action.payload )
      return {...state, playlistInfo: {...state.playlistInfo, genres: removedGenres}, genreAction: {action: 'remove', id: action.payload.id}};

    case 'ADDSUGGESTEDSONG':
      return {...state, suggestedSongs: [...state.suggestedSongs, ...action.payload]}

    case 'REMOVESUGGESTEDSONG':
      const suggestedSongs = state.suggestedSongs.filter( song => song.genreid !== action.payload )
      return {...state, suggestedSongs};

    case 'ADDSONG':
      const addedTracks = [...state.playlistInfo.tracks, action.payload]
      return {...state, playlistInfo: {...state.playlistInfo, tracks: addedTracks}};

    case 'REMOVESONG':
      const removedTracks = state.playlistInfo.tracks.filter( track => track.id !== action.payload.id )
      return {...state, playlistInfo: {...state.playlistInfo, tracks: removedTracks}};

    default: 
      return state
  }
}