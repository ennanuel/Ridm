import { playPause, prevSong, nextSong, setActiveSong, setAlbum, stop, shuffleOn, shuffleOff, setRepeat, addToUpNext } from "../redux/features/playerSlice"
import { store } from '../redux/store';
import { displayMessage } from "./prompt"

export function play() {
    store.dispatch(playPause(true));
}

export function pause () {
    store.dispatch(playPause(false));
}

export function next (i) {
    store.dispatch(stop());
    store.dispatch(nextSong(i));
}

export function prev (i) {
    store.dispatch(stop());
    store.dispatch(prevSong(i));
}

export function onShuffle (isSongPlaying) {
    store.dispatch(shuffleOn(isSongPlaying));
}

export function offShuffle () {
    store.dispatch(shuffleOff())
}

export function onRepeat () {
    store.dispatch(setRepeat(true))
}

export function offRepeat () {
    store.dispatch(setRepeat(false))
}

export const playSongs = ({ tracks, song, i, album}) => {
    if (tracks.length < 1) return pause();
    store.dispatch(setActiveSong({ tracks, song, i }));
    if (album) store.dispatch(setAlbum(album));
    play();
}

export const playNext = ({ tracks, album }) => {
    store.dispatch(addToUpNext(tracks));
    if (album) store.dispatch(setAlbum(album));
    displayMessage('Added to Queue!');
}