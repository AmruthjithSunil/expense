import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import expenseSlice from "./expenseSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    expense: expenseSlice.reducer,
    theme: themeSlice.reducer,
  },
});

export const authActions = authSlice.actions;
export const expenseActions = expenseSlice.actions;
export const themeActions = themeSlice.actions;

export default store;
