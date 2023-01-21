import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {};

const StockSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setStock: (state, action: PayloadAction<any>) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const { setStock } = StockSlice.actions;

export default StockSlice.reducer;
