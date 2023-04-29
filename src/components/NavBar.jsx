import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ marginLeft: "16px" }}>
        <NavLink to="/">Home</NavLink>
      </div>
      <div style={{ marginLeft: "16px" }}>
        <NavLink to="/auth">Login</NavLink>
      </div>
      <div style={{ marginLeft: "16px" }}>
        <NavLink to="/update-profile">Update Profile</NavLink>
      </div>
    </div>
  );
}
