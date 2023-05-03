import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";

export default function Root() {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  return (
    <div style={{ textAlign: "center" }}>
      {isLoggedin && <NavBar />}
      <Outlet />
    </div>
  );
}
