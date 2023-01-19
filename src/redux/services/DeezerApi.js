import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const deezerApi = createApi({
    reducerPath: "deezerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost/3000',
    }),
    endpoints: (builder) => ({
        getTopGenres: builder.query({query: () => "/editorial"}),
        getTopGenreTracks: builder.query({query: ( genreid ) => `/editorial/${ genreid }/charts?limit=50`}),
        getTopChart: builder.query({query: ( type ) => `/chart/0/${ type || '' }?limit=50`}),
        getSongDetails: builder.query({query: ( songid ) => `/track/${ songid }`}),
        getArtistDetails: builder.query({query: ( artistid ) => `/artist/${ artistid }`}),
        getRelatedSongs: builder.query({query: ( artistid, limit ) => `/artist/${ artistid }/top?limit=${ limit || 30 }`}),
        getCountryInfo: builder.query({query: () => '/infos'}),
        getSearchSongs: builder.query({query: ( song ) => `/search?q=${ song }`}),
        getSearchAlbums: builder.query({query: ( album ) => `/search/album?q=${ album }`}),
        getSearchArtists: builder.query({query: ( artist ) => `/search/artist?q=${ artist }`})
    })
})

export const {
    useGetTopGenresQuery,
    useGetTopGenreTracksQuery,
    useGetTopChartQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetRelatedSongsQuery,
    useGetCountryInfoQuery,
    useGetSearchSongsQuery,
    useGetSearchAlbumsQuery,
    useGetSearchArtistsQuery
} = deezerApi