import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useSelector } from "react-redux";
import { verificationHandler } from "../utils/home";

export default function Home() {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const idToken = useSelector((state) => state.auth.idToken);
  const user = useSelector((state) => state.auth.user);

  if (isLoggedin && user === null) {
    console.log("getUser");
  }

  const [id, setId] = useState(null);

  function updateId(id) {
    setId(id);
  }

  return (
    <>
      {!isLoggedin && <Navigate to="/auth" />}
      <h1>Welcome to Expense Tracker!!!</h1>
      {user !== null && !user.displayName && (
        <p>
          Your profile is incomplete.
          <Link to="/update-profile">Complete now</Link>
        </p>
      )}
      {user !== null && !user.emailVerified && (
        <p>
          Your email is not verified.
          <button onClick={verificationHandler}>Verify Now</button>
        </p>
      )}
      <ExpenseForm id={id} updateId={updateId} />
      <ExpenseList updateId={updateId} />
    </>
  );
}
