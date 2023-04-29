import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Root() {
  return (
    <div style={{ textAlign: "center" }}>
      <NavBar />
      <Outlet />
    </div>
  );
}
