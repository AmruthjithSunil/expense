import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: { expenses: [] },
  reducers: {
    addExpense(state, action) {
      state.expenses = [action.payload, ...state.expenses];
    },
    removeExpenses(state, action) {
      state.expenses = state.expenses.filter(
        (expense) => expense.id !== action.payload
      );
    },
  },
});

export default expenseSlice;
