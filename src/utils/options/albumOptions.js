import { playSongs, playNext } from "../player"
import { addFavorites, removeFavorites, removeBlacklist } from "../library"
import { addToBlacklist, addToPlaylist } from "../prompt"

export const albumOptions = [
    {
        name: "Play album",
        action: ({song, tracks, i, album}) => playSongs({ song, tracks, i, album})
    },
    {
        name: "Play next",
        action: ({tracks, album}) => playNext({tracks, album})
    },
    {
        name: "Add to favorites",
        action: ({album}) => addFavorites('albums', album)
    },
    {
        name: "Remove from favorites",
        action: ({album}) => removeFavorites('albums', album.id)
    },
    {
        name: "Add to playlist",
        action: ({tracks}) => addToPlaylist(tracks)
    },
    {
        name: "Go to artist",
        action: ({artist}) => `/artists/${artist.id}`
    },
    {
        name: "Don't show album",
        action: ({album}) => addToBlacklist({...album, type: 'albums'})
    },
    {
        name: "Remove from blacklist",
        action: ({album}) => removeBlacklist('albums', album.id)
    }
]
