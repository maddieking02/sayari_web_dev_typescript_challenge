import { createSlice } from '@reduxjs/toolkit';
import { Display } from './types';

const initialState: {
  display: Display;
  search: string;
  results: [];
} = {
  display: 'home',
  search: '',
  results: []
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
  }
});

export const { updateDisplay, updateSearch, updateResults } = dataSlice.actions;
export default dataSlice.reducer;