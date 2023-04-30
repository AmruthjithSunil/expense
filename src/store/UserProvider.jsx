import { useEffect, useState } from "react";
import UserContext from "./user-context";
import env from "../env";

export default function UserProvider({ children }) {
  if (!localStorage.getItem("refreshToken")) {
    localStorage.setItem("refreshToken", "null");
  }

  const [isLoggedin, setIsLoggedin] = useState(
    localStorage.getItem("refreshToken") !== "null"
  );

  const [idToken, setIdToken] = useState("null");
  const [user, setUser] = useState({});
  const [expenses, setExpenses] = useState([]);

  async function getUserData() {
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
    setIdToken(tokens.id_token);
    localStorage.setItem("refreshToken", tokens.refresh_token);

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
      setUser(data.users[0]);
    } else {
      alert(data.error.message);
      return;
    }

    const shortEmail = data.users[0].email
      .replaceAll("@", "")
      .replaceAll(".", "");
    const getExpensesEndpoint = `https://haha-1b803.firebaseio.com/${shortEmail}.json`;
    const res1 = await fetch(getExpensesEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const expenses = await res1.json();
    if (res1.ok) {
      setExpenses(
        Object.keys(expenses).map((key) => {
          return { id: key, ...expenses[key] };
        })
      );
    } else {
      alert(expenses.error.message);
    }
  }

  useEffect(() => {
    isLoggedin && getUserData();
  }, []);

  const userContext = {
    idToken,
    user,
    isLoggedin,
    expenses,
    updateIdToken: (token) => {
      setIdToken(token);
    },
    updateIsLoggedin: (status) => {
      setIsLoggedin(status);
    },
    addExpense: (expense) => {
      setExpenses((expenses) => [expense, ...expenses]);
    },
    removeExpense: (id) => {
      setExpenses((expenses) =>
        expenses.filter((expense) => expense.id !== id)
      );
    },
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
}
