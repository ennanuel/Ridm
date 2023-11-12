import { playSongs, playNext } from "../player";
import { addFavorites, removeFavorites, addBlacklist, removeBlacklist } from "../library";
import { addToBlacklist } from "../prompt";

export const radioOptions = [
    {
        name: "Play songs",
        action: ({song, tracks, i}) => playSongs({song, tracks, i})
    },
    {
        name: "Play next",
        action: ({tracks}) => playNext({tracks})
    },
    {
        name: "Add to favorites",
        action: ({radio}) => addFavorites('radios', radio)
    },
    {
        name: "Remove from favorites",
        action: ({radio}) => removeFavorites('radios', radio.id)
    },
    {
        name: "Don't show radio",
        action: ({radio}) => addToBlacklist({...radio, type: 'radios'})
    },
    {
        name: "Remove from blacklist",
        action: ({radio}) => removeBlacklist('radios', radio.id)
    },
]
