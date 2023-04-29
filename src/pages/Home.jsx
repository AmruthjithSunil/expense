import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../store/user-context";
import env from "../env";

export default function Home() {
  const userCtx = useContext(UserContext);

  async function verificationHandler() {
    const emailVerificationEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${env.apiKey}`;
    const res = await fetch(emailVerificationEndpoint, {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: userCtx.idToken,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
      {!userCtx.isLoggedin && <Navigate to="/auth" />}
      <h1>Welcome to Expense Tracker!!!</h1>
      {!userCtx.user.displayName && (
        <p>
          Your profile is incomplete.
          <Link to="/update-profile">Complete now</Link>
        </p>
      )}
      {!userCtx.user.emailVerified && (
        <p>
          Your email is not verified.
          <button onClick={verificationHandler}>Verify Now</button>
        </p>
      )}
    </>
  );
}
