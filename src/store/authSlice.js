import { createSlice } from "@reduxjs/toolkit";

if (!localStorage.getItem("refreshToken")) {
  localStorage.setItem("refreshToken", "null");
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedin: localStorage.getItem("refreshToken") !== "null",
    idToken: "null",
    user: null,
  },
  reducers: {
    updateIdToken(state, action) {
      state.idToken = action.payload;
    },
    updateIsLoggedin(state, action) {
      state.isLoggedin = action.payload;
    },
    updateUser(state, action) {
      state.user = action.payload;
    },
  },
});

export default authSlice;
