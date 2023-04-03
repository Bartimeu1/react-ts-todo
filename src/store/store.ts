import { configureStore } from '@reduxjs/toolkit';

import foldersReducer from './folders/foldersSlice';
import tasksSlice from './tasks/tasksSlice';

const store = configureStore({
  reducer: {
    folders: foldersReducer,
    tasks: tasksSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
