import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitStateApp } from '../../../interfaces/store';

const initialState: IInitStateApp = {
  loading: false,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<false>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = appSlice.actions;

export default appSlice.reducer;
