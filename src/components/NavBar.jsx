import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { authActions } from "../store";

export default function NavBar() {
  const dispatch = useDispatch();

  function logoutHandler() {
    localStorage.setItem("refreshToken", "null");
    dispatch(authActions.updateIdToken("null"));
    dispatch(authActions.updateIsLoggedin(false));
  }

  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "16px" }}>
        <NavLink to="/">Home</NavLink>
      </div>
      <div style={{ marginLeft: "16px" }}>
        <NavLink to="/update-profile">Update Profile</NavLink>
      </div>
      <div onClick={logoutHandler} style={{ marginLeft: "16px" }}>
        <NavLink to="/auth">Logout</NavLink>
      </div>
    </div>
  );
}
