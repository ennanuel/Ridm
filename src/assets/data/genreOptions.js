import { playSongs, playNext } from '../../functions/player'
import { addFavorites, removeFavorites, removeBlacklist } from "../../functions/library";
import { addToBlacklist } from '../../functions/prompt';


export const genreOptions = [
    {
        name: "Play songs",
        actionType: "dispatch",
        action: ({dispatch, tracks, song, i}) => playSongs({dispatch, song, tracks, i})
    },
    {
        name: "Play next",
        actionType: "dispatch",
        action: ({dispatch, tracks}) => playNext({dispatch, tracks})
    },
    {
        name: "Add to favorites",
        action: ({dispatch, genre}) => addFavorites(dispatch, 'genres', genre)
    },
    {
        name: "Remove from favorites",
        action: ({dispatch, genre}) => removeFavorites(dispatch, 'genres',  genre.id)
    },
    {
        name: "Don't show genre",
        action: ({dispatch, genre}) => addToBlacklist(dispatch, {...genre, type: 'genres'})
    },
    {
        name: "Remove from favorites",
        action: ({dispatch, genre}) => removeBlacklist(dispatch, 'genres',  genre.id)
    }
]