import React from "react";

const UserContext = React.createContext({
  idToken: "",
  user: {},
  isLoggedin: false,
  expenses: [],
  updateIdToken: (token) => {},
  updateIsLoggedin: (status) => {},
  addExpense: (expense) => {},
});

export default UserContext;
