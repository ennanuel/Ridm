import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import libraryReducer from './features/librarySlice';
import promptReducer from './features/promptSlice';
import { deezerApi } from './services/DeezerApi';
import { musixMatchApi } from './services/MusixMatchApi';

export const store = configureStore({
  reducer: {
    [deezerApi.reducerPath]: deezerApi.reducer,
    [musixMatchApi.reducerPath]: musixMatchApi.reducer,
    player: playerReducer,
    library: libraryReducer,
    prompt: promptReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deezerApi.middleware, musixMatchApi.middleware)
});
