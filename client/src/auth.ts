import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  test: string;
} = {
  test: ''
}

export const sampleSlice = createSlice({
  name: 'sample',
  initialState,
  reducers: {
    updateTest: (state, action) => {
      state.test = action.payload;
    },
  }
});

export const { updateTest } = sampleSlice.actions;
export default sampleSlice.reducer;