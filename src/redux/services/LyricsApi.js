import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const lyricsApi = createApi({
    reducerPath: "lyrics",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/lyrics`,
    }),
    endpoints: (builder) => ({
        getLyrics: builder.query({
            query: (songId) => `?songId=${songId}`
        })
    })
});

export const {
    useGetLyricsQuery
} = lyricsApi;