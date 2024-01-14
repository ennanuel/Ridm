const shuffle = (tracks = [], song) => {
    let shuffledTracks = [...tracks];
    for (let i = shuffledTracks.length - 1; i > 0; i--) {
        let randomIndex = Math.floor(Math.random() * (i + 1));
        let currSong = shuffledTracks[i];
        shuffledTracks[i] = shuffledTracks[randomIndex];
        shuffledTracks[randomIndex] = currSong;
    }
    const songIndex = song ? shuffledTracks.findIndex(track => track.id === song.id) : 0;
    const currentSong = shuffledTracks[songIndex];
    return {
        song: currentSong,
        i: songIndex,
        tracks: shuffledTracks,
    }
};

export default shuffle;