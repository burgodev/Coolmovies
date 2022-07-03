import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Movie } from '../../../types/typings';

interface MovieState {
  data?: Movie[];
  loading: boolean;
  error: string;
}

const initialState: MovieState = {
  data: [],
  loading: false,
  error: '',
};

export const slice = createSlice({
  initialState,
  name: 'movies',
  reducers: {
    fetch: () => {},
    loading: (state) => {
      state.loading = true;
    },
    loaded: (state, action: PayloadAction<{ data: Movie[] }>) => {
      state.data = action.payload.data;
      state.loading = false;
    },
    loadError: (state, err) => {
      state.error = err.payload.message;
      state.loading = false;
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
