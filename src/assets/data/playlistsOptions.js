

export const playlistsOptions = [
    {
        name: "Create Playlist",
        action: ({navigate}) => navigate('/playlists?add=true')
    },
    {
        name: "Delete Playlist",
        action: ({navigate}) => navigate('/playlists?edit=true')
    },
    {
        name: "Go to Blacklist",
        action: ({navigate}) => navigate('/blacklist')
    },
]