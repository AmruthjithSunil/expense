import { useContext } from "react";
import UserContext from "../store/user-context";

export default function ExpenseList() {
  const userCtx = useContext(UserContext);

  return (
    <>
      {userCtx.expenses.map((expense) => (
        <div key={expense.description}>
          {expense.amount}-{expense.description}-{expense.category}
        </div>
      ))}
    </>
  );
}
