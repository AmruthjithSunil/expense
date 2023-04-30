import { useContext, useRef } from "react";
import UserContext from "../store/user-context";

export default function ExpenseForm() {
  const userCtx = useContext(UserContext);

  const amount = useRef();
  const description = useRef();
  const category = useRef();

  function submitHandler(e) {
    e.preventDefault();
    const expense = {
      id: amount.current.value,
      amount: amount.current.value,
      description: description.current.value,
      category: category.current.value,
    };
    userCtx.addExpense(expense);

    amount.current.value = "";
    description.current.value = "";
    category.current.value = "food";
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
