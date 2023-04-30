import { useContext, useRef } from "react";
import UserContext from "../store/user-context";

export default function ExpenseForm() {
  const userCtx = useContext(UserContext);

  const amount = useRef();
  const description = useRef();
  const category = useRef();

  async function submitHandler(e) {
    e.preventDefault();

    const shortEmail = userCtx.user.email
      .replaceAll("@", "")
      .replaceAll(".", "");
    const expensesEndpoint = `https://haha-1b803.firebaseio.com/${shortEmail}.json`;

    const expense = {
      amount: amount.current.value,
      description: description.current.value,
      category: category.current.value,
    };

    const res = await fetch(expensesEndpoint, {
      method: "POST",
      body: JSON.stringify(expense),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      console.log(data);
      userCtx.addExpense(expense);
      amount.current.value = "";
      description.current.value = "";
      category.current.value = "food";
    } else {
      alert(data.error.message);
    }
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
