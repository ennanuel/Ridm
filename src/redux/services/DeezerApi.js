import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIURL } from '../../assets/data/constants'

export const deezerApi = createApi({
    reducerPath: "deezerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: APIURL + '/deezer',
    }),
    endpoints: (builder) => ({
        getTopGenres: builder.query({query: () => "/genre?limit=50"}),
        getGenreDetails: builder.query({query: (id) => `/genre/${id}`}),
        getGenreCharts: builder.query({query: (id) => `/editorial/${id}/charts?limit=50`}),
        getGenreRadios: builder.query({query: (id) => `/genre/${id}/radios?limit=50`}),
        getTopChartTracks: builder.query({query: ( genreid ) => `/chart/${ genreid }/tracks?limit=50`}),
        getTopChart: builder.query({query: ( genreid ) => `/chart/${ genreid }?limit=50`}),
        getTopChartAlbums: builder.query({query: (id) => `/chart/${id || 0}/albums?limit=50`}),
        getTopChartArtists: builder.query({query: ( genreid ) => `/chart/${ genreid }/artists?limit=50`}),
        getSongDetails: builder.query({query: ( songid ) => `/track/${ songid }`}),
        getArtistDetails: builder.query({query: ( artistid ) => `/artist/${ artistid }`}),
        getArtists: builder.query({query: ( artistid ) => `/artist/${ artistid }/related`}),
        getSongs: builder.query({query: ( artistid, limit ) => `/artist/${ artistid }/top?limit=${ limit || 30 }`}),
        getCountryInfo: builder.query({query: () => '/infos'}),
        getSearchSongs: builder.query({query: ( song ) => `/search?q=${ song }`}),
        getSearchAlbums: builder.query({query: ( album ) => `/search/album?q=${ album }`}),
        getSearchArtists: builder.query({query: ( artist ) => `/search/artist?q=${ artist }`}),
        getArtistAlbum: builder.query({query: ( artist ) => `/artist/${artist}/albums`}),
        getAlbumDetails: builder.query({query: ( album ) => `/album/${album}`}),
        getAlbums: builder.query({query: ( genreid ) => `/editorial/${genreid}/selection`}),
        getAlbumTracks: builder.query({query: ( album ) => `/album/${album}/tracks?limit=100`}),
        getRecentReleases: builder.query({query: (genreid) => `/editorial/${genreid}/releases`}),
        getTopRadios: builder.query({query: (limit) => `/radio/top?limit=${limit}`}),
        getRadioTracks: builder.query({query: (id) => `/radio/${id}/tracks`})
    })
})

export const {
    useGetTopGenresQuery,
    useGetGenreChartsQuery,
    useGetGenreDetailsQuery,
    useGetGenreRadiosQuery,
    useGetTopChartQuery,
    useGetTopChartTracksQuery,
    useGetTopChartArtistsQuery,
    useGetTopChartAlbumsQuery,
    useGetSongDetailsQuery,
    useGetArtistDetailsQuery,
    useGetSongsQuery,
    useGetArtistsQuery,
    useGetCountryInfoQuery,
    useGetSearchSongsQuery,
    useGetSearchAlbumsQuery,
    useGetSearchArtistsQuery,
    useGetArtistAlbumQuery,
    useGetAlbumDetailsQuery,
    useGetAlbumsQuery,
    useGetAlbumTracksQuery,
    useGetRecentReleasesQuery,
    useGetTopRadiosQuery,
    useGetRadioTracksQuery
} = deezerApi