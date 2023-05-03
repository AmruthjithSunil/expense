import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenses,
  getTokens,
  getUser,
  verificationHandler,
} from "../utils/home";
import { authActions, expenseActions } from "../store";

export default function Home() {
  const isLoggedin = useSelector((state) => state.auth.isLoggedin);
  const idToken = useSelector((state) => state.auth.idToken);
  const user = useSelector((state) => state.auth.user);
  const expenses = useSelector((state) => state.expense.expenses);

  const dispatch = useDispatch();

  async function getEverything() {
    const tokens = await getTokens();
    dispatch(authActions.updateIdToken(tokens.id_token));
    const data = await getUser(tokens);
    dispatch(authActions.updateUser(data.users[0]));
    const expenses = await getExpenses(data.users[0].email);
    dispatch(
      expenseActions.updateExpenses(
        Object.keys(expenses).map((key) => {
          return { id: key, ...expenses[key] };
        })
      )
    );
  }

  if (isLoggedin && user === null) {
    getEverything();
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
      {expenses.reduce(
        (totalExpense, expense) => totalExpense + expense.amount * 1,
        0
      ) > 10000 && <button>Activate Premium</button>}
    </>
  );
}
