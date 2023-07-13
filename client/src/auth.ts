import { createSlice } from '@reduxjs/toolkit';
import { Display, Post } from './types';

const initialState: {
  display: Display;
  search: string;
  results: [];
  post: Post;
} = {
  display: 'home',
  search: '',
  results: [],
  post: {
    post_id: null,
    title: null,
    body: null,
    creation: '',
    score: null,
    user_id: null,
    name: null
  }
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