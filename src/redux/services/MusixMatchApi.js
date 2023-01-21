import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const musixMatchApi = createApi({
    reducerPath: "musixMatchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://ridm-proxy.onrender.com/musixmatch',
    }),
    endpoints: (builder) => ({
        getLyrics: builder.query({query: (trackisrc) => `/matcher.lyrics.get?track_isrc=${ trackisrc }`})
    })
})

export const {
    useGetLyricsQuery
} = musixMatchApi