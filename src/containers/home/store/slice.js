/* eslint-disable prefer-destructuring */
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'app',
  initialState: {
    assetList: null,
    supportedCurriencies: null,
    currency: "usd",
    assetHistory: null,
    particularAssetDetail: null
  },
  reducers: {
    resetStore: (state, action) => {
      state.assetList = null;
      state.supportedCurriencies = null;
      state.currency = "usd";
      state.assetHistory = null;
      state.particularAssetDetail = null;
    },
    changeState: (state, action) => {
      const varName = Object.keys(action.payload)[0];
      state[varName] = action.payload[varName];
    },
  }

});

export const { actions } = authSlice;
export default authSlice.reducer;