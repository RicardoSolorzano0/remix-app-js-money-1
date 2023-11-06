import { Link, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import ExpensesList from "../components/expenses/ExpensesList";
import expensesStyle from "../styles/expenses.css";
import { getExpenses } from "../data/expenses.server";
import { requireUserSession } from "../data/auth.server";

export default function ExpensesLayout() {
  const path = useLocation();
  const expenses = useLoaderData();
  const hasExpenses = expenses && expenses.length > 0;
  return (
    <>
      <Outlet />
      {path.pathname !== "/expenses/analysis" ? (
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

          {hasExpenses && <ExpensesList expenses={expenses} />}
          {!hasExpenses && (
            <section id="no-expenses">
              <h1>No expenses found</h1>
              <p>
                Start <Link to="add">adding some</Link> today
              </p>
            </section>
          )}
        </main>
      ) : null}
    </>
  );
}

export async function loader({ request }) {
  await requireUserSession(request);

  const expenses = await getExpenses();
  return expenses;
}

export function links() {
  return [{ rel: "stylesheet", href: expensesStyle }];
}
