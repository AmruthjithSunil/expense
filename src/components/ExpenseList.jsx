import { useContext } from "react";
import UserContext from "../store/user-context";

export default function ExpenseList({ updateId }) {
  const userCtx = useContext(UserContext);

  async function editHandler(e) {
    updateId(e.target.id);
  }

  async function deleteHandler(e) {
    const shortEmail = userCtx.user.email
      .replaceAll("@", "")
      .replaceAll(".", "");
    const expenseEndpoint = `https://haha-1b803.firebaseio.com/${shortEmail}/${e.target.id}.json`;

    const res = await fetch(expenseEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      userCtx.removeExpense(e.target.id);
      console.log("Expense successfuly deleted");
    } else {
      alert(data.error.message);
    }
  }

  return (
    <>
      {userCtx.expenses.map((expense) => (
        <div key={expense.id}>
          {expense.amount}-{expense.description}-{expense.category}
          <button id={expense.id} onClick={editHandler}>
            Edit
          </button>
          <button id={expense.id} onClick={deleteHandler}>
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
