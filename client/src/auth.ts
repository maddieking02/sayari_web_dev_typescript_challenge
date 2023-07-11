import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  search: string;
} = {
  search: ''
}

export const dataSlice = createSlice({
  name: 'stackoverfaux',
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state.search = action.payload;
    },
  }
});

export const { updateSearch } = dataSlice.actions;
export default dataSlice.reducer;