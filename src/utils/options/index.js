import { songOptions } from "./songOptions"
import { artistOptions } from "./artistOptions"
import { albumOptions } from "./albumOptions"
import { genreOptions } from './genreOptions'
import { radioOptions } from './radioOptions'
import { playlistOptions } from "./playlistOptions"
import { playlistsOptions } from "./playlistsOptions"

export const options = {
    track: songOptions,
    artist: artistOptions,
    album: albumOptions,
    genre: genreOptions,
    radio: radioOptions,
    playlist: playlistOptions,
    playlists: playlistsOptions
}