import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import "../index.css";

export default function Root() {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);

  return (
    <div style={{ textAlign: "center" }} className={darkMode ? "darkmode" : ""}>
      {isLoggedin && <NavBar />}
      <Outlet />
    </div>
  );
}
