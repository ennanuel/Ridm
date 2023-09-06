export const getData = ({ type, data, blacklist, favorites, noFilter, params }) => {
    try {
        if (!(['tracks', 'artists', 'albums', 'genres', 'radios'].includes(type) && data && blacklist && favorites)) throw "parameter(s) empty or invalid 'type' parameter";

        const newData = data
            .slice()
            .sort(
                (a, b) => params.get('sort') == 'recent' && type != 'artists' ?
                    (new Date(a.release_date)).getTime() - (new Date(b.release_date)).getTime() :
                    params.get('sort') == 'recent' && type == 'artists' ?
                    (a.fans - b.fans) :
                    1
            )
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

        if(newData.tracks) {
            newData.tracks = getData({type: 'tracks', data: data.tracks.data, blacklist, favorites})
        }

        return newData
    } catch (error) {
        console.error(error)
        return {}
    }
}