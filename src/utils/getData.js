import { store } from "../redux/store";

const ACCEPTABLE_DATA_TYPES = ['tracks', 'artists', 'albums', 'genres', 'radios'];
const getStoreLibrary = () => store.getState().library;

var blacklist, favorites, ignoreFilter, dataType, filterRgxp, sortValue;

export const getData = ({ type, data, noFilter = false, albumFilter = '', sortType = '' }) => {
    if (!ACCEPTABLE_DATA_TYPES.includes(type) || !data) return data;
    const library = getStoreLibrary();
    blacklist = library.blacklist;
    favorites = library.favorites;
    ignoreFilter = noFilter;
    dataType = type;
    sortValue = sortType
    if (albumFilter) filterRgxp = new RegExp(albumFilter, 'i');
    else filterRgxp = new RegExp('', 'i');
    const newData = data
        .slice()
        .sort(handleSorting)
        .map(addFavoriteAndBlacklist)
        .filter(handleFilter);
    return newData;
}

export const getSingleData = ({ type, data }) => {
    if (!ACCEPTABLE_DATA_TYPES.includes(type) || !data) return data;
    const library = getStoreLibrary();
    blacklist = library.blacklist;
    favorites = library.favorites;
    dataType = type;
    const newData = addFavoriteAndBlacklist(data);
    const dataTracks = data.tracks ? getData({ dataType: 'tracks', data: data.tracks.data }) : null;
    newData.tracks = dataTracks;
    return newData;
}

function handleSorting(a, b) {
    let sortNumber = 1;
    if (sortValue == 'popular' && dataType == 'artists') sortNumber = a.rank - b.rank;
    if (sortValue == 'popular' && dataType != 'artists') {
        sortNumber = (new Date(a.release_date)).getTime() - (new Date(b.release_date)).getTime();
    }
    return sortNumber;
};
function handleFilter(item) {
    const itemInBlacklist = !item.blacklist || ignoreFilter;
    const itemIsAlbumWithRecType = dataType == 'albums' ? filterRgxp.test(item.record_type) : true;
    return itemInBlacklist && itemIsAlbumWithRecType;
};
function addFavoriteAndBlacklist(item) {
    const newItem = { ...item };
    newItem.favorite = favorites[dataType].map(elem => elem.id).includes(item.id);
    newItem.blacklist = blacklist[dataType].map(elem => elem.id).includes(item.id);
    return newItem;
};