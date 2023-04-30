import { useContext, useRef } from "react";
import UserContext from "../store/user-context";

export default function ExpenseForm({ id, updateId }) {
  const userCtx = useContext(UserContext);

  const amount = useRef();
  const description = useRef();
  const category = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const shortEmail = userCtx.user.email
      .replaceAll("@", "")
      .replaceAll(".", "");
    const expensesEndpoint = `https://haha-1b803.firebaseio.com/${shortEmail}${
      id ? "/" + id : ""
    }.json`;

    const expense = {
      amount: amount.current.value,
      description: description.current.value,
      category: category.current.value,
    };

    const res = id
      ? await fetch(expensesEndpoint, {
          method: "PUT",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        })
      : await fetch(expensesEndpoint, {
          method: "POST",
          body: JSON.stringify(expense),
          headers: {
            "Content-Type": "application/json",
          },
        });
    const data = await res.json();

    if (res.ok) {
      if (id) {
        userCtx.removeExpense(id);
        updateId(null);
      }
      userCtx.addExpense({ id: data.name, ...expense });
      amount.current.value = "";
      description.current.value = "";
      category.current.value = "food";
    } else {
      alert(data.error.message);
    }
  }

  if (id) {
    const expense = userCtx.expenses.find((expense) => expense.id === id);
    amount.current.value = expense.amount;
    description.current.value = expense.description;
    category.current.value = expense.category;
  }

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor="amount">Amount:</label>
      <input type="number" id="amount" ref={amount} />
      <br />
      <label htmlFor="description">Description:</label>
      <input type="text" id="description" ref={description} />
      <br />
      <label htmlFor="category">Category</label>
      <select name="category" id="category" ref={category}>
        <option value="food">Food</option>
        <option value="fuel">Fuel</option>
        <option value="salary">Salary</option>
      </select>
      <br />
      <button type="submit">Add Expense</button>
    </form>
  );
}
