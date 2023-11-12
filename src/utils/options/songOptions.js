import { playSongs, playNext } from "../player";
import { addFavorites, removeFavorites, removeBlacklist } from "../library";
import { removeFromPlaylistPrompt, addToPlaylist, addToBlacklist } from "../prompt";

export const songOptions = [
    {
        name: "Play song",
        action: ({song, tracks, i}) => playSongs({song, tracks, i})
    },
    {
        name: "Play next",
        action: ({song, album}) => playNext({tracks: [song], album})
    },
    {
        name: "Add to favorites",
        action: ({song}) => addFavorites('tracks', song)
    },
    {
        name: "Remove from favorites",
        action: ({song}) => removeFavorites('tracks', song.id)
    },
    {
        name: "Add to playlist",
        action: ({song}) => addToPlaylist([song])
    },
    {
        name: "Remove from playlist",
        action: ({playlist, song}) => removeFromPlaylistPrompt(playlist, [song])
    },
    {
        name: "Go to song",
        action: ({song}) => `/songs/${song.id}`
    },
    {
        name: "Go to artist",
        action: ({artist}) => `/artists/${artist.id}`
    },
    {
        name: "Go to album",
        action: ({album}) => `/albums/${album.id}}`
    },
    {
        name: "Don't show song",
        action: ({song}) => addToBlacklist({...song, type: 'tracks'})
    },
    {
        name: "Remove from blacklist",
        action: ({song}) => removeBlacklist('tracks', song.id)
    }
]