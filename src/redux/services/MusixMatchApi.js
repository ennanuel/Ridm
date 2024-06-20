import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const musixMatchApi = createApi({
    reducerPath: "musixMatchApi",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/lyrics`,
    }),
    endpoints: (builder) => ({
        getLyrics: builder.query({query: (trackisrc) => `?path=matcher.lyrics.get?track_isrc=${ trackisrc }`})
    })
})

export const {
    useGetLyricsQuery
} = musixMatchApi