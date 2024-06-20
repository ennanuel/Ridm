import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
    reducerPath: "deezerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/music-data`,
    }),
    endpoints: (builder) => ({
        getTopGenres: builder.query({query: () => `?path=genre?limit=50`}),
        getGenreDetails: builder.query({query: (id) => `?path=genre/${id}`}),
        getGenreCharts: builder.query({query: (id) => `?path=editorial/${id}/charts?limit=50`}),
        getGenreRadios: builder.query({query: (id) => `?path=genre/${id}/radios?limit=50`}),
        getTopChartTracks: builder.query({query: ( genreid ) => `?path=chart/${ genreid }/tracks?limit=50`}),
        getTopChart: builder.query({query: ( genreid ) => `?path=chart/${ genreid }?limit=50`}),
        getTopChartAlbums: builder.query({query: (id) => `?path=chart/${id || 0}/albums?limit=50`}),
        getTopChartArtists: builder.query({query: ( genreid ) => `?path=chart/${ genreid }/artists?limit=50`}),
        getSongDetails: builder.query({query: ( songid ) => `?path=track/${ songid }`}),
        getArtistDetails: builder.query({query: ( artistid ) => `?path=artist/${ artistid }`}),
        getArtists: builder.query({query: ( artistid ) => `?path=artist/${ artistid }/related`}),
        getSongs: builder.query({query: ( artistid, limit ) => `?path=artist/${ artistid }/top?limit=${ limit || 30 }`}),
        getCountryInfo: builder.query({query: () => `?path=infos`}),
        getSearchSongs: builder.query({query: ( song ) => `?path=search?q=${ song }`}),
        getSearchAlbums: builder.query({query: ( album ) => `?path=search/album?q=${ album }`}),
        getSearchArtists: builder.query({query: ( artist ) => `?path=search/artist?q=${ artist }`}),
        getArtistAlbum: builder.query({query: ( artist ) => `?path=artist/${artist}/albums`}),
        getAlbumDetails: builder.query({query: ( album ) => `?path=album/${album}`}),
        getAlbums: builder.query({query: ( genreid ) => `?path=editorial/${genreid}/selection`}),
        getAlbumTracks: builder.query({query: ( album ) => `?path=album/${album}/tracks?limit=100`}),
        getRecentReleases: builder.query({query: (genreid) => `?path=editorial/${genreid}/releases`}),
        getTopRadios: builder.query({query: (limit) => `?path=radio/top?limit=${limit}`}),
        getRadioTracks: builder.query({query: (id) => `?path=radio/${id}/tracks`}),
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
    useGetRadioTracksQuery,
} = deezerApi