import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useContext } from "react";
import UserContext from "../store/user-context";

export default function Root() {
  const userCtx = useContext(UserContext);

  return (
    <div style={{ textAlign: "center" }}>
      {userCtx.isLoggedin && <NavBar />}
      <Outlet />
    </div>
  );
}
