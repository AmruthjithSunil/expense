import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../store/user-context";

export default function NavBar() {
  const userCtx = useContext(UserContext);

  function logoutHandler() {
    localStorage.setItem("refreshToken", "null");
    userCtx.updateIdToken("null");
    userCtx.updateIsLoggedin(false);
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "16px" }}>
        <NavLink to="/">Home</NavLink>
      </div>
      <div style={{ marginLeft: "16px" }}>
        <NavLink to="/update-profile">Update Profile</NavLink>
      </div>
      {userCtx.isLoggedin && (
        <div onClick={logoutHandler} style={{ marginLeft: "16px" }}>
          <NavLink to="/auth">Logout</NavLink>
        </div>
      )}
    </div>
  );
}
