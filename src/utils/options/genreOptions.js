import { playSongs, playNext } from '../player'
import { addFavorites, removeFavorites, removeBlacklist } from "../library";
import { addToBlacklist } from '../prompt';


export const genreOptions = [
    {
        name: "Play songs",
        actionType: "dispatch",
        action: ({tracks, song, i}) => playSongs({song, tracks, i})
    },
    {
        name: "Play next",
        actionType: "dispatch",
        action: ({tracks}) => playNext({tracks})
    },
    {
        name: "Add to favorites",
        action: ({genre}) => addFavorites('genres', genre)
    },
    {
        name: "Remove from favorites",
        action: ({genre}) => removeFavorites('genres',  genre.id)
    },
    {
        name: "Don't show genre",
        action: ({genre}) => addToBlacklist({...genre, type: 'genres'})
    },
    {
        name: "Remove from blacklist",
        action: ({genre}) => removeBlacklist('genres',  genre.id)
    }
]