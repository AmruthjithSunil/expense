import React from "react";

const UserContext = React.createContext({
  idToken: "",
  user: {},
  isLoggedin: false,
  updateIdToken: (token) => {},
  updateIsLoggedin: (status) => {},
});

export default UserContext;
