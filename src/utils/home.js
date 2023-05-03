import env from "../env";

export async function verificationHandler() {
  const emailVerificationEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${env.apiKey}`;
  const res = await fetch(emailVerificationEndpoint, {
    method: "POST",
    body: JSON.stringify({
      requestType: "VERIFY_EMAIL",
      idToken,
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
