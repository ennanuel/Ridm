import { showPrompt, showPlaylistPrompt, hideSuccessMessage, showSuccessMessage } from "../redux/features/promptSlice"

export const addToPlaylist = (dispatch, songs) => {
    dispatch(showPlaylistPrompt(songs))
}

export const addToBlacklist = (dispatch, value) => {
    const parameters = {
        promptMessage: `Do you want to add ${value.type.substring(0, value.type.length - 2)} to blacklist?`,
        acceptText: 'Yes',
        cancelText: 'Cancel',
        parameters: {
            type: 'addToBlacklist',
            data: value
        }
    }
    dispatch(showPrompt(parameters))
}

export const editPlaylistPrompt = (dispatch, playlist, editData) => {
    const promptValues = {
        promptMessage: 'Are you sure want to edit this playlist?',
        cancelText: 'Cancel',
        acceptText: 'Yes',
        parameters: {
          type: 'editPlaylist', 
          data: {...editData, name: editData.name === '' ? playlist.name : editData.name}
        }
      }
    dispatch(showPrompt(promptValues))
}

export const deletePlaylistPrompt = (dispatch, playlist) => {
    const parameters = {
        parameters: {type: 'deletePlaylist', data: playlist},
        promptMessage: `Are you sure you want to delete "${playlist.name}"?`,
        cancelText: "Cancel",
        acceptText: "Delete"
    }
    dispatch(showPrompt(parameters))
}

export const removeFromPlaylistPrompt = (dispatch, playlist, songs) => {
    const parameters = {
        parameters: {type: 'removeSongFromPlaylist', data: {tracks: songs, playlistid: playlist.id}},
        promptMessage: `Do you want to remove this song${songs.length <= 1 ? '' : 's'} "${playlist.name}"?`,
        cancelText: "Cancel",
        acceptText: "Remove"
    }
    dispatch(showPrompt(parameters))
}

export const displayMessage = (dispatch, message) => {
    dispatch(hideSuccessMessage())
    dispatch(showSuccessMessage(message))

    setTimeout(() => {dispatch(hideSuccessMessage())}, 1100)
}