import { playSongs, playNext } from "../../functions/player";
import { addFavorites, removeFavorites, addBlacklist, removeBlacklist } from "../../functions/library";
import { addToBlacklist } from "../../functions/prompt";

export const radioOptions = [
    {
        name: "Play songs",
        action: ({dispatch, song, tracks, i}) => playSongs({dispatch, song, tracks, i})
    },
    {
        name: "Play next",
        action: ({dispatch, tracks}) => playNext({dispatch, tracks})
    },
    {
        name: "Add to favorites",
        action: ({dispatch, radio}) => addFavorites(dispatch, 'radios', radio)
    },
    {
        name: "Remove from favorites",
        action: ({dispatch, radio}) => removeFavorites(dispatch, 'radios', radio.id)
    },
    {
        name: "Don't show radio",
        action: ({dispatch, radio}) => addToBlacklist(dispatch, {...radio, type: 'radios'})
    },
    {
        name: "Remove from blacklist",
        action: ({dispatch, radio}) => removeBlacklist(dispatch, 'radios', radio.id)
    },
]
