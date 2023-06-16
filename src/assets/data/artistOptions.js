import { playSongs } from "../../functions/player"
import { addFavorites, removeFavorites, removeBlacklist } from "../../functions/library"
import { addToBlacklist } from "../../functions/prompt"

export const artistOptions = [
    {
        name: "Play songs",
        action: ({dispatch, song, tracks, i}) => playSongs({dispatch, song, tracks, i})
    },
    {
        name: "About artist",
        action: () => { location.href = "#bio" }
    },
    {
        name: "Add to favorites",
        action: ({dispatch, artist}) => addFavorites(dispatch, 'artists', artist)
    },
    {
        name: "Remove from favorites",
        action: ({dispatch, artist}) => removeFavorites(dispatch, 'artists', artist.id)
    },
    {
        name: "Don't show artist",
        action: ({dispatch, artist}) => addToBlacklist(dispatch, {...artist, type: 'artists'})
    },
    {
        name: "Remove from blacklist",
        action: ({dispatch, artist}) => removeBlacklist(dispatch, 'artists', artist.id)
    },
]