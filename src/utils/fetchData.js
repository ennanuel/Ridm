import { playSongs, pause } from './player.js'
import { getData } from './getData.js'

export const fetchSongs = async (album) => {
    pause();
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/deezer/album/${album.id}/tracks`)
        if(response.status !== 200) throw 'something went wrong';
        const result = await response.json();
        const tracks = result.data;
        const song = tracks[0];
        const i = 0;
        playSongs({ song, tracks, i, album });
    } catch (error) {
        console.log(error);
    }
}

export const fetchSuggestedSongs = ({ id, suggestedSongsIds }) => new Promise(
    async function(resolve, reject) {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/deezer/chart/${id}/tracks?limit=5`);
            if (response.status !== 200) throw 'error occured';
            const result = await response.json();
            const res = getData({ type: 'tracks', data: result.data });
            const data = res.filter(song => !suggestedSongsIds.includes(song.id));
            resolve(data);
        } catch (error) {
            reject(error);
        }
    }
)