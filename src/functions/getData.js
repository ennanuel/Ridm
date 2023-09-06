export const getData = ({ type, data, blacklist, favorites, noFilter, params }) => {
    let sortType, filterText;
    try {
        if (!(['tracks', 'artists', 'albums', 'genres', 'radios'].includes(type) && data && blacklist && favorites)) return data;
        
        if (Boolean(params)) {
            sortType = params.get('sort');
            filterText = new RegExp(params.get('filter') || '', 'i')
        } else {
            sortType = ''
            filterText = new RegExp('', 'i')
        }

        const newData = data
            .slice()
            .sort(
                (a, b) => sortType == 'popular' && type != 'artists' ?
                    data?.artist?.fans - data?.artist?.fans :
                    sortType == 'popular' && type == 'artists' ?
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
            .filter( elem => (!elem.blacklist || noFilter) && ( type == 'albums' ? filterText.test(elem.record_type) : true ) )

        return newData
    } catch (error) {
        console.error(error)
        return []
    }
}

export const getSingleData = ({type, data, favorites, blacklist}) => {
    try {
        if(!['tracks', 'artists', 'albums', 'genres', 'radios'].includes(type) || !data || !favorites || !blacklist ) return data;

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