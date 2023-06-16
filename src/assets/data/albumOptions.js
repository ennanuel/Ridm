import { playSongs, playNext } from "../../functions/player"
import { addFavorites, removeFavorites, removeBlacklist } from "../../functions/library"
import { addToBlacklist, addToPlaylist } from "../../functions/prompt"

export const albumOptions = [
    {
        name: "Play album",
        action: ({dispatch, song, tracks, i, album}) => playSongs({dispatch, song, tracks, i, album})
    },
    {
        name: "Play next",
        action: ({dispatch, tracks, album}) => playNext({dispatch, tracks, album})
    },
    {
        name: "About album",
        action: () => { location.href = "#bio" }
    },
    {
        name: "Add to favorites",
        action: ({dispatch, album}) => addFavorites(dispatch, 'albums', album)
    },
    {
        name: "Remove from favorites",
        action: ({dispatch, album}) => removeFavorites(dispatch, 'albums', album.id)
    },
    {
        name: "Add to playlist",
        action: ({dispatch, tracks}) => addToPlaylist(dispatch, tracks)
    },
    {
        name: "Go to artist",
        action: ({navigate, artist}) => navigate(`/artists/${artist.id}`)
    },
    {
        name: "Don't show album",
        action: ({dispatch, album}) => addToBlacklist(dispatch, {...album, type: 'albums'})
    },
    {
        name: "Remove from blacklist",
        action: ({dispatch, album}) => removeBlacklist(dispatch, 'albums', album.id)
    }
]
