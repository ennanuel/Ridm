import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import libraryReducer from './features/librarySlice';
import promptReducer from './features/promptSlice';
import { deezerApi } from './services/DeezerApi';
import { lyricsApi } from './services/LyricsApi';

export const store = configureStore({
  reducer: {
    [deezerApi.reducerPath]: deezerApi.reducer,
    [lyricsApi.reducerPath]: lyricsApi.reducer,
    player: playerReducer,
    library: libraryReducer,
    prompt: promptReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deezerApi.middleware, lyricsApi.middleware)
});
