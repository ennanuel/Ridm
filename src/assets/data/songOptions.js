import { playSongs, playNext } from "../../functions/player";
import { addFavorites, removeFavorites, removeBlacklist } from "../../functions/library";
import { removeFromPlaylistPrompt, addToPlaylist, addToBlacklist } from "../../functions/prompt";

export const songOptions = [
    {
        name: "Play song",
        action: ({dispatch, song, tracks, i}) => playSongs({dispatch, song, tracks, i})
    },
    {
        name: "Play next",
        action: ({dispatch, song, album}) => playNext({dispatch, tracks: [song], album})
    },
    {
        name: "Add to favorites",
        action: ({dispatch, song}) => addFavorites(dispatch, 'tracks', song)
    },
    {
        name: "Remove from favorites",
        action: ({dispatch, song}) => removeFavorites(dispatch, 'tracks', song.id)
    },
    {
        name: "Add to playlist",
        action: ({dispatch, song}) => addToPlaylist(dispatch, [song])
    },
    {
        name: "Remove from playlist",
        action: ({dispatch, playlist, song}) => removeFromPlaylistPrompt(dispatch, playlist, [song])
    },
    {
        name: "Go to song",
        action: ({navigate, song}) => navigate(`/songs/${song.id}`)
    },
    {
        name: "Go to artist",
        action: ({navigate, artist}) => navigate(`/artists/${artist.id}`)
    },
    {
        name: "Go to album",
        action: ({navigate, album}) => navigate(`/albums/${album.id}}`)
    },
    {
        name: "Don't show song",
        action: ({dispatch, song}) => addToBlacklist(dispatch, {...song, type: 'tracks'})
    },
    {
        name: "Remove from blacklist",
        action: ({dispatch, song}) => removeBlacklist(dispatch, 'tracks', song.id)
    }
]