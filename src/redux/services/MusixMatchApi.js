import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { APIURL } from '../../assets/data/constants'

export const musixMatchApi = createApi({
    reducerPath: "musixMatchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: APIURL +  '/musixmatch',
    }),
    endpoints: (builder) => ({
        getLyrics: builder.query({query: (trackisrc) => `/matcher.lyrics.get?track_isrc=${ trackisrc }`})
    })
})

export const {
    useGetLyricsQuery
} = musixMatchApi