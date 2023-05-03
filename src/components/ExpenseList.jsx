import { useDispatch, useSelector } from "react-redux";
import { expenseActions } from "../store";

export default function ExpenseList({ updateId }) {
  const expenses = useSelector((state) => state.expense.expenses);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  async function editHandler(e) {
    updateId(e.target.id);
  }

  async function deleteHandler(e) {
    const shortEmail = user.email.replaceAll("@", "").replaceAll(".", "");
    const expenseEndpoint = `https://haha-1b803.firebaseio.com/${shortEmail}/${e.target.id}.json`;

    const res = await fetch(expenseEndpoint, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      dispatch(expenseActions.removeExpenses(e.target.id));
      console.log("Expense successfuly deleted");
    } else {
      alert(data.error.message);
    }
  }

  return (
    <>
      {expenses.map((expense) => (
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
