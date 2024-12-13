import { configureStore } from '@reduxjs/toolkit';
import { profileApi } from './services/profileApi'; // The API slice file

export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});
