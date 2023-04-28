import { useState } from "react";
import Auth from "./components/Auth";
import Home from "./components/Home";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  function login() {
    setIsAuth(true);
  }

  return <>{isAuth ? <Home /> : <Auth login={login} />}</>;
}
