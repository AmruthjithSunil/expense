import { useContext } from "react";
import { Outlet } from "react-router-dom";
import UserContext from "../store/user-context";
import NavBar from "../components/NavBar";

export default function Root() {
  const userCtx = useContext(UserContext);

  function logoutHandler() {
    localStorage.setItem("refreshToken", "null");
    userCtx.updateIsLoggedin(false);
  }

  return (
    <div style={{ textAlign: "center" }}>
      <NavBar />
      <Outlet />
    </div>
  );
}
