/* eslint-disable prefer-destructuring */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'app',
  initialState: {
    currentStep: 0,
  },
  reducers: {
    resetStore: (state, action) => {
      state.currentStep = 0;
    },
    changeState: (state, action) => {
      const varName = Object.keys(action.payload)[0];
      state[varName] = action.payload[varName];
    },
  }

});

export const { actions } = authSlice;
export default authSlice.reducer;