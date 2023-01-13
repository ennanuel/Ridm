import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const musixMatchApi = createApi({
    reducerPath: "musixMatchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.musixmatch.com/ws/1.1',
    }),
    endpoints: (builder) => ({
        getLyrics: builder.query({query: (trackisrc) => `/matcher.lyrics.get?track_isrc=${ trackisrc }&apikey=d053b06ac72eb219930d968e2d928358`})
    })
})

export const {
    useGetLyricsQuery
} = musixMatchApi