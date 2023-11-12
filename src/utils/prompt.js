import { showPrompt, showPlaylistPrompt, hideSuccessMessage, showSuccessMessage } from "../redux/features/promptSlice";
import { store } from '../redux/store';
import { addBlacklist, deletePlaylists, editCurrentPlaylist, removeFromPlaylist } from "./library";

export const addToPlaylist = (songs) => {
    store.dispatch(showPlaylistPrompt(songs));
}

export const addToBlacklist = (value) => {
    const parameters = {
        promptMessage: `Do you want to add ${value.type.substring(0, value.type.length - 2)} to blacklist?`,
        acceptText: 'Yes',
        cancelText: 'Cancel',
        parameters: {
            type: 'addToBlacklist',
            data: value
        }
    }
    store.dispatch(showPrompt(parameters));
}

export const editPlaylistPrompt = (playlist, editData) => {
    const promptValues = {
        promptMessage: 'Are you sure want to edit this playlist?',
        cancelText: 'Cancel',
        acceptText: 'Yes',
        parameters: {
          type: 'editPlaylist', 
          data: {...editData, name: editData.name === '' ? playlist.name : editData.name}
        }
      }
    store.dispatch(showPrompt(promptValues));
}

export const deletePlaylistPrompt = (playlist) => {
    const parameters = {
        parameters: {type: 'deletePlaylist', data: playlist},
        promptMessage: `Are you sure you want to delete "${playlist.name}"?`,
        cancelText: "Cancel",
        acceptText: "Delete"
    }
    store.dispatch(showPrompt(parameters));
}

export const removeFromPlaylistPrompt = (playlist, songs) => {
    const parameters = {
        parameters: {type: 'removeSongFromPlaylist', data: {tracks: songs, playlistid: playlist.id}},
        promptMessage: `Do you want to remove this song${songs.length <= 1 ? '' : 's'} "${playlist.name}"?`,
        cancelText: "Cancel",
        acceptText: "Remove"
    }
    store.dispatch(showPrompt(parameters));
}

export const displayMessage = (message) => {
    store.dispatch(hideSuccessMessage());
    store.dispatch(showSuccessMessage(message));

    setTimeout(() => store.dispatch(hideSuccessMessage()), 1100);
}

export const promptFunctions = {
    deletePlaylist: (data) => {
        deletePlaylists([data])
        displayMessage('Playlist deleted.')
    },
    addToBlacklist: (data) => {
        addBlacklist(data.type, data)
        displayMessage('Added to Blacklist!')
        return -1;
    },
    removeSongFromPlaylist: (data) => {
        removeFromPlaylist(data)
        displayMessage('Songs Removed')
    },
    editPlaylist: (data) => {
        editCurrentPlaylist(data)
        displayMessage('Playlist edited!')
        return `/playlists/${data.id}`;
    }
};