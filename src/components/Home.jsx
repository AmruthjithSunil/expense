import { useState } from "react";
import UpdateProfile from "./UpdateProfile";

export default function Home() {
  const [revealProfile, setRevealProfile] = useState(false);

  return (
    <>
      <h1>Welcome to Expense Tracker!!!</h1>
      {!revealProfile && (
        <p>
          Your profile is incomplete.
          <span
            onClick={() => setRevealProfile(true)}
            style={{ color: "blue" }}
          >
            Complete now
          </span>
        </p>
      )}
      {revealProfile && (
        <>
          <UpdateProfile hideUpdateProfile={() => setRevealProfile(false)} />
        </>
      )}
    </>
  );
}
