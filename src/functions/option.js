export const loadOptions = ({options, type, favorite, playlists, blacklist, small}) => {
    
    const res = options[type]
        .filter( 
            option => 
                option.name !== (favorite ? 'Add to favorites' : 'Remove from favorites') &&
                option.name !== (playlists ?  'Add to playlist' : 'Remove from playlist' ) &&
                (blacklist ? !/Don't show/i.test(option.name) : option.name !== 'Remove from blacklist') &&
                (small ? true : option.name !== 'Go to song' )
        )

    return res
}