import { useContext, useRef, useState } from "react";
import env from "../env";
import UserContext from "../store/user-context";
import { Link, useNavigate } from "react-router-dom";

export default function Auth() {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(true);

  function toggleSignup() {
    setIsSignup((isSignup) => !isSignup);
  }

  const signupEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.apiKey}`;
  const loginEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.apiKey}`;

  const email = useRef();
  const password = useRef();
  const confirmedPassword = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    if (
      isSignup &&
      password.current.value !== confirmedPassword.current.value
    ) {
      return;
    }
    const endpoint = isSignup ? signupEndpoint : loginEndpoint;
    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      const data = await res.json();
      console.log("User has successfully signed up/logged in");
      localStorage.setItem("refreshToken", data.refreshToken);
      userCtx.updateIdToken(data.idToken);
      userCtx.updateIsLoggedin(true);
      navigate("/");
    } else {
      const data = await res.json();
      const errorMessage = data.error.message
        ? data.error.message
        : "Authentication Failed";
      alert(errorMessage);
    }
  }

  return (
    <div>
      <h3>{isSignup ? "Sign Up" : "Login"}</h3>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Email" ref={email} />
        <input type="password" placeholder="Password" ref={password} />
        {isSignup && (
          <input
            type="password"
            placeholder="Confirmed Password"
            ref={confirmedPassword}
          />
        )}
        <input type="submit" value={isSignup ? "Sign Up" : "Login"} />
      </form>
      <Link to="/forgot-password">Forgot Password?</Link>
      <br />
      <button onClick={toggleSignup}>
        Or {isSignup ? "Login" : "Sign Up"}
      </button>
    </div>
  );
}
