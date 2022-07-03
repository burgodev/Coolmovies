import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Review, Movie } from '../../../types/typings';

interface FetchReviews {
  reviews: Review[];
  movie: Movie;
}

type Success = 'create' | 'update' | '' | undefined;

interface ReviewsState {
  data?: FetchReviews;
  loading: boolean;
  error: string;
  success: Success;
}

const initialState: ReviewsState = {
  loading: false,
  error: '',
  success: '',
  data: {
    reviews: [],
    movie: {
      id: '',
      imgUrl: '',
      title: '',
      releaseDate: '',
      movieDirectorByMovieDirectorId: {
        name: '',
      },
    },
  },
};

export const slice = createSlice({
  initialState,
  name: 'reviews',
  reducers: {
    fetch: (state, data) => {},
    update: (state, data) => {
      state.success = '';
      state.error = '';
    },
    loading: (state) => {
      state.loading = true;
    },
    loaded: (
      state,
      action: PayloadAction<{
        data: FetchReviews;
        success?: Success;
      }>
    ) => {
      state.loading = false;
      state.data = action.payload.data;
      state.success = action.payload.success;
    },
    loadError: (state, err) => {
      state.error = err.payload.message;
      state.loading = false;
    },
    create: (state, data) => {
      state.success = '';
      state.error = '';
    },
  },
});

export const { actions } = slice;
export type SliceAction = typeof actions;
export default slice.reducer;
