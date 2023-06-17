export const getData = ({type, data, blacklist, favorites}) => {
    try {
        if(!['tracks', 'artists', 'albums', 'genres', 'radios'].includes(type) || !data || !blacklist || !favorites) throw "parameter(s) empty or invalid 'type' parameter";

        const newData = data
            .filter( elem => !blacklist[type].map( elem => elem.id ).includes(elem.id) )
            .map( elem => ({...elem, favorite: favorites[type].map( elem => elem.id ).includes(elem.id) }))

        return newData
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getSingleData = ({type, data, favorites}) => {
    try {
        if(!['tracks', 'artists', 'albums', 'genres', 'radios'].includes(type) || !data || !favorites) return [];

        const newData = {...data, favorite: favorites[type].map( elem => elem?.id ).includes(data.id)}

        return newData
    } catch (error) {
        console.error(error)
        return []
    }
}