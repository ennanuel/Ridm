const shuffle = (tracks, song) => {
    let shuffledTracks = []
    let i = 0

    while(shuffledTracks.length < tracks.length && i <= 100000) {
        const rando = Math.floor(Math.random() * tracks.length)

        if(shuffledTracks.some(elem => elem.id === tracks[rando].id)) continue;
        shuffledTracks.push(tracks[rando])
        i++
    }

    return {
        song: song || shuffledTracks[0],
        i: song ? shuffledTracks.findIndex( elem => elem.id === song.id ) : 0,
        tracks: shuffledTracks,
    }
}

export default shuffle