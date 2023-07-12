import { createSlice } from '@reduxjs/toolkit';
import { Display } from './types';

const initialState: {
  display: Display;
  search: string;
  results: [];
  post: [];
} = {
  display: 'home',
  search: '',
  results: [],
  post: [],
}

export const dataSlice = createSlice({
  name: 'stackoverfaux',
  initialState,
  reducers: {
    updateDisplay: (state, action) => {
      state.display = action.payload;
    },
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
    updateResults: (state, action) => {
      state.results = action.payload;
    },
    updatePost: (state, action) => {
      state.post = action.payload;
    }
  }
});

export const { updateDisplay, updateSearch, updateResults, updatePost } = dataSlice.actions;
export default dataSlice.reducer;