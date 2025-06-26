import {
  combineReducers,
  configureStore,
  type Reducer,
} from '@reduxjs/toolkit';
import app from './slices/app';

const rootReducers: Reducer = combineReducers({
  app,
});

export const store = configureStore({
  reducer: rootReducers,
  middleware: (getter) =>
    getter({
      serializableCheck: {
        ignoredActionPaths: ['payload.data'], // разрешение передавать функции в redux только в data объекте
      },
    }),
});
