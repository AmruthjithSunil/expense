import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import env from "../env";

export default function ForgotPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const email = useRef();

  async function submitHandler(e) {
    setIsLoading(true);
    e.preventDefault();
    const passwordResetEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${env.apiKey}`;

    const res = await fetch(passwordResetEndpoint, {
      method: "POST",
      body: JSON.stringify({
        requestType: "PASSWORD_RESET",
        email: email.current.value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    const data = await res.json();
    if (res.ok) {
      console.log("success");
      console.log(data);
    } else {
      alert(data.error.message);
    }
  }

  return (
    <>
      Enter the email with which ou have registered
      <form onSubmit={submitHandler} style={{ margin: "8px" }}>
        <input
          type="email"
          style={{ minWidth: "200px" }}
          ref={email}
          placeholder="email"
        />
        <button type="submit">Send Link</button>
      </form>
      {isLoading ? (
        <>sending request...</>
      ) : (
        <>
          New user?<Link to="/auth">Sign Up</Link>
        </>
      )}
    </>
  );
}
