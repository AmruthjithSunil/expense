import { useRef } from "react";
import env from "../env";
import { useSelector } from "react-redux";

export default function UpdateProfile() {
  const user = useSelector((state) => state.auth.user);
  const idToken = useSelector((state) => state.auth.idToken);

  const profileEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${env.apiKey}`;

  const fullName = useRef();
  const photoUrl = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    if (photoUrl.current.value === "" || fullName.current.value === "") {
      return;
    }

    const res = await fetch(profileEndpoint, {
      method: "POST",
      body: JSON.stringify({
        idToken,
        displayName: fullName.current.value,
        photoUrl: photoUrl.current.value,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.ok) {
      console.log("Updated");
    } else {
      const data = await res.json();
      let errorMessage = "Authentication Failed";
      if (data.error.message) {
        errorMessage = data.error.message;
      }
      alert(errorMessage);
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" ref={fullName} defaultValue={user.displayName} />
        <label htmlFor="profilePhoto">Profile Photo URL</label>
        <input type="text" ref={photoUrl} defaultValue={user.photoUrl} />
        <input type="submit" value="Update" />
      </form>
    </>
  );
}
