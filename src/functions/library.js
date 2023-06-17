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