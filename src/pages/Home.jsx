import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../store/user-context";

export default function Home() {
  const userCtx = useContext(UserContext);

  return (
    <>
      {!userCtx.isLoggedin && <Navigate to="/auth" />}
      <h1>Welcome to Expense Tracker!!!</h1>
      {!(userCtx.user.displayName && userCtx.user.photoUrl) && (
        <p>
          Your profile is incomplete.
          <Link to="/update-profile">Complete now</Link>
        </p>
      )}
    </>
  );
}
