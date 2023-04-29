import React from "react";

const UserContext = React.createContext({
  user: {},
  isLoggedin: false,
  updateIdToken: (token) => {},
  updateIsLoggedin: (status) => {},
});

export default UserContext;
