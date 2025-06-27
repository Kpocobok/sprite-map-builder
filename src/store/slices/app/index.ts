import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { IInitStateApp, IModal } from '../../../interfaces/store';

const initialState: IInitStateApp = {
  loading: false,
  modals: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<false>) => {
      state.loading = action.payload;
    },
    setModal: (state, action: PayloadAction<IModal>) => {
      state.modals.push(action.payload);
    },
    closeModal: (state) => {
      state.modals.pop();
    },
    closeModals: (state) => {
      state.modals = [];
    },
  },
});

export const { setLoading, setModal, closeModal, closeModals } =
  appSlice.actions;

export default appSlice.reducer;
