import { useRef } from "react";
import "./CSS/SignUp.css";
import env from "../env";

export default function SignUp() {
  const signupEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.apiKey}`;

  const email = useRef();
  const password = useRef();
  const confirmedPassword = useRef();

  async function submitHandler(e) {
    e.preventDefault();
    if (password.current.value !== confirmedPassword.current.value) {
      return;
    }
    console.log("a");
    const res = await fetch(signupEndpoint, {
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
    console.log("b");
    if (res.ok) {
      console.log("c");
      const data = await res.json();
      console.log("User has successfully signed up");
    } else {
      console.log("d");
      const data = await res.json();
      let errorMessage = "Authentication Failed";
      if (data.error.message) {
        errorMessage = data.error.message;
      }
      alert(errorMessage);
    }
  }

  return (
    <div>
      <h3>Sign Up</h3>
      <form onSubmit={submitHandler}>
        <input type="email" placeholder="Email" ref={email} />
        <input type="password" placeholder="Password" ref={password} />
        <input
          type="password"
          placeholder="Confirmed Password"
          ref={confirmedPassword}
        />
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
}
