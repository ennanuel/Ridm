import { store } from "../redux/store";

export const filterOptions = ({ options, type, favorite, blacklist, small }) => {
    function filterOutOptions(option) {
        const isFavoriteOrNot = option.name !== (favorite ? 'Add to favorites' : 'Remove from favorites');
        const inPlaylistOrNot = option.name !== (playlists ? 'Add to playlist' : 'Remove from playlist');
        const inBlacklistOrNot = (blacklist ? !/Don't show/i.test(option.name) : option.name !== 'Remove from blacklist');
        return isFavoriteOrNot && inPlaylistOrNot && inBlacklistOrNot
    };
    var { library: { playlists } } = store.getState();
    const optionsType = options[type];
    const filteredOptions = optionsType.filter(filterOutOptions)
    return filteredOptions
};