import { playSongs, playNext } from "../../functions/player"
import { deletePlaylistPrompt } from "../../functions/prompt"

export const playlistOptions = [
    {
        name: "Play songs",
        action: ({dispatch, song, tracks, i}) => playSongs({dispatch, song, tracks, i})
    },
    {
        name: "Play next",
        action: ({dispatch, tracks}) => playNext({dispatch, tracks})
    },
    {
        name: "Edit playlist",
        action: ({navigate, playlist}) => navigate(`/playlists/${playlist.id}?edit=true`)
    },
    {
        name: "Delete playlist",
        action: ({dispatch, playlist}) => deletePlaylistPrompt(dispatch, playlist)
    },
]