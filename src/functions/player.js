import { playPause, prevSong, nextSong, setActiveSong, setAlbum, stop, shuffleOn, shuffleOff, setRepeat, addToUpNext } from "../redux/features/playerSlice"
import { displayMessage } from "./prompt"

export const play = (dispatch) => {
    dispatch(playPause(true))
}

export const pause = (dispatch) => {
    dispatch(playPause(false))
}

export const next = (dispatch, i) => {
    dispatch(stop())
    dispatch(nextSong(i))
}

export const prev = (dispatch, i) => {
    dispatch(stop())
    dispatch(prevSong(i))
}

export const onShuffle = ({dispatch, tracks, song, i}) => {
    dispatch(setActiveSong({tracks, song, i}))
    dispatch(shuffleOn())
}

export const offShuffle = (dispatch) => {
    dispatch(shuffleOff())
}

export const onRepeat = (dispatch) => {
    dispatch(setRepeat(true))
}

export const offRepeat = (dispatch) => {
    dispatch(setRepeat(false))
}

export const playSongs = ({ dispatch, tracks, song, i, album}) => {
    if(tracks.length < 1) {
        pause(dispatch)
        return
    }

    dispatch(setActiveSong({tracks, song, i}))
    if(album) {
        dispatch(setAlbum(album))
    }
    play(dispatch)
}

export const playNext = ({ dispatch, tracks, album }) => {
    dispatch(addToUpNext(tracks))
    if(album) {
        dispatch(setAlbum(album))
    }
    displayMessage(dispatch, 'Added to Queue!')
}