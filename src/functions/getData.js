export const getData = ({type, data, blacklist, favorites, noFilter}) => {
    try {
        if(!(['tracks', 'artists', 'albums', 'genres', 'radios'].includes(type) && data && blacklist && favorites)) throw "parameter(s) empty or invalid 'type' parameter";

        const newData = data
            .map( elem => (
                {
                    ...elem, 
                    favorite: favorites[type].map( elem => elem.id ).includes(elem.id), 
                    blacklist: blacklist[type].map( elem => elem.id ).includes(elem.id) 
                }
            ))
            .filter( elem => !elem.blacklist || noFilter )

        return newData
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getSingleData = ({type, data, favorites, blacklist}) => {
    try {
        if(!['tracks', 'artists', 'albums', 'genres', 'radios'].includes(type) || !data || !favorites || !blacklist ) throw "parameter(s) empth or invalid 'type' parameter";

        const newData = {
            ...data, 
            favorite: favorites[type].map( elem => elem?.id ).includes(data.id), 
            blacklist: blacklist[type].map( elem => elem?.id ).includes(data.id)
        }

        return newData
    } catch (error) {
        console.error(error)
        return []
    }
}