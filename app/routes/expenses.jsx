import { Link, Outlet, useLoaderData } from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";
import expensesStyle from "../styles/expenses.css";
import ExpensesHeader from "../components/navigation/ExpensesHeader";
import { getExpenses } from "../data/expenses.server";

export default function ExpensesLayout() {
  const expenses = useLoaderData();
  return (
    <>
      <ExpensesHeader />
      <Outlet />
      <main>
        <section id="expenses-actions">
          <Link to="add">
            icon
            <span>Add Expense</span>
          </Link>
          <a href="/expenses/raw">
            icon
            <span>Load raw data</span>
          </a>
        </section>

        <ExpensesList expenses={expenses} />
      </main>
    </>
  );
}

export function loader() {
  return getExpenses();
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyle }];
}
