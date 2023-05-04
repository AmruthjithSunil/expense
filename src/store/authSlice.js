import { createSlice } from "@reduxjs/toolkit";

if (!localStorage.getItem("refreshToken")) {
  localStorage.setItem("refreshToken", "null");
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isPremium: false,
    isLoggedin: localStorage.getItem("refreshToken") !== "null",
    idToken: "null",
    user: null,
  },
  reducers: {
    updateIdToken(state, action) {
      console.log("a");
      state.idToken = action.payload;
    },
    updateIsLoggedin(state, action) {
      state.isLoggedin = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
    toggleIsPremium(state) {
      state.isPremium = !state.isPremium;
    },
  },
});

export default authSlice;
