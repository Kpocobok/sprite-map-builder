import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
  IInitStateApp,
  ILayoutSettings,
  IModal,
} from '../../../interfaces/store';
import { DEFAULT_LAYOUT } from '../../../constants/default';

const initialState: IInitStateApp = {
  loading: false,
  layout: DEFAULT_LAYOUT,
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
    setLayout: (state, action: PayloadAction<ILayoutSettings>) => {
      state.layout = action.payload;
    },
  },
});

export const { setLoading, setModal, closeModal, closeModals, setLayout } =
  appSlice.actions;

export default appSlice.reducer;
