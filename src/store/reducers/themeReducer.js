import { createSlice } from '@reduxjs/toolkit';

const themeReducer = createSlice({
  name: 'theme',
  initialState: {
    value: 'light'
  },
  reducers: {
    toggleTheme: state => {
      state.value = state.value === 'light' ? 'dark' : 'light';
    }
  }
});

export const { toggleTheme } = themeReducer.actions;
export default themeReducer.reducer;
