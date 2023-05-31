import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "63701cc1f03239b7f700000e",
  user: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUser: (state, action) => {
      state.user = action.payload;
      //CHECK USER DATA TRY TO POPULATE STATE
    },
  },
});

export const { setMode, setUser } = globalSlice.actions;

export default globalSlice.reducer;
