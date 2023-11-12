import { playSongs, playNext } from "../player"
import { deletePlaylistPrompt } from "../prompt"

export const playlistOptions = [
    {
        name: "Play songs",
        action: ({song, tracks, i}) => playSongs({song, tracks, i})
    },
    {
        name: "Play next",
        action: ({tracks}) => playNext({tracks})
    },
    {
        name: "Edit playlist",
        action: ({playlist}) => `/playlists/${playlist.id}?edit=true`
    },
    {
        name: "Delete playlist",
        action: ({playlist}) => deletePlaylistPrompt(playlist)
    },
]