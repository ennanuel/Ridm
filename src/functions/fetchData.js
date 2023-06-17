import { playSongs, pause } from './player.js'
import { APIURL } from '../assets/data/constants.js'
import { getData } from './getData.js'

export const fetchSongs = async (dispatch, album) => {
    pause(dispatch)
    
    try {
        const response = await fetch(APIURL + `/deezer/album/${album.id}/tracks`)

        if(response.status !== 200) throw 'something went wrong';

        const result = await response.json()
        
        const tracks = result.data
        const song = tracks[0]
        const i = 0;

        playSongs({dispatch, song, tracks, i, album})
    } catch (error) {
        console.log(error)
    }
}

export const fetchSuggestedSongs = async (genreid, setSuggestedSongs, blacklist, favorites) => {
    try {
        const response = await fetch(`${APIURL}/deezer/chart/${ genreid }/tracks?limit=5`)

        if(response.status !== 200) throw 'error occured'

        const result = await response.json()

        const data = getData({type: 'tracks', data: result.data, blacklist, favorites})

        setSuggestedSongs(prev => [...prev, ...data])
    } catch (error) {
        setSuggestedSongs([])
        console.log(error)
    }
}