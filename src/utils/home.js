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

export async function getTokens() {
  const getIdTokenEndpoint = `https://securetoken.googleapis.com/v1/token?key=${env.apiKey}`;
  const response = await fetch(getIdTokenEndpoint, {
    method: "POST",
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: localStorage.getItem("refreshToken"),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tokens = await response.json();
  return tokens;
}

export async function getUser(tokens) {
  const getUserEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${env.apiKey}`;
  const res = await fetch(getUserEndpoint, {
    method: "POST",
    body: JSON.stringify({
      idToken: tokens.id_token,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    alert(data.error.message);
  }
}

export async function getExpenses(email) {
  const shortEmail = email.replaceAll("@", "").replaceAll(".", "");
  const getExpensesEndpoint = `https://haha-1b803.firebaseio.com/${shortEmail}.json`;
  const res = await fetch(getExpensesEndpoint, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const expenses = await res.json();
  if (res.ok) {
    return expenses;
  } else {
    alert(expenses.error.message);
  }
}
