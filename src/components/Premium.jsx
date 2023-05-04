import { useDispatch, useSelector } from "react-redux";
import { authActions, themeActions } from "../store";

export default function Premium() {
  const expenses = useSelector((state) => state.expense.expenses);
  const isPremium = useSelector((state) => state.auth.isPremium);
  const dispatch = useDispatch();

  function makeCSV(expenses) {
    return expenses
      .map((expense) => Object.values(expense).join(","))
      .join("\n");
  }

  return (
    <>
      {expenses.reduce(
        (totalExpense, expense) => totalExpense + expense.amount * 1,
        0
      ) > 100 &&
        !isPremium && (
          <button
            onClick={() => {
              dispatch(authActions.toggleIsPremium());
            }}
          >
            Activate Premium
          </button>
        )}
      {isPremium && (
        <>
          <button>
            <a
              download="expenses.csv"
              href={URL.createObjectURL(new Blob([makeCSV(expenses)]))}
            >
              Download CSV
            </a>
          </button>
          <button
            onClick={() => {
              dispatch(themeActions.toggleDarkMode());
            }}
          >
            Dark Mode
          </button>
        </>
      )}
    </>
  );
}
