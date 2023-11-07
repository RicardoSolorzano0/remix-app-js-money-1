import { Link, useLoaderData } from "@remix-run/react";
import Chart from "../components/expenses/Chart";
import ExpenseStatistics from "../components/expenses/ExpenseStatistics";
import { getExpenses } from "../data/expenses.server";
import marketingStyles from "../styles/marketing.css";
import { requireUserSession } from "../data/auth.server";

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  const hasExpenses = expenses && expenses.length > 0;

  return (
    <>
      {hasExpenses && (
        <main>
          <Chart expenses={expenses} />
          <ExpenseStatistics expenses={expenses} />
        </main>
      )}

      {!hasExpenses && (
        <section id="no-expenses">
          <h1>No expenses found</h1>
          <p>
            Start <Link to="add">adding some</Link> today
          </p>
        </section>
      )}
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: marketingStyles }];
}

export async function loader({ request }) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);
  return expenses;
}
