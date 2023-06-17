

export const playlistsOptions = [
    {
        name: "Create Playlist",
        action: ({navigate}) => navigate('/playlists?add=true')
    },
    {
        name: "Go to Blacklist",
        action: ({navigate}) => navigate('/blacklist')
    },
]