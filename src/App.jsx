import { useState } from "react";
import SignUp from "./components/SignUp";
import Home from "./components/Home";

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  function login() {
    setIsAuth(true);
  }

  return <>{isAuth ? <Home /> : <SignUp login={login} />}</>;
}
