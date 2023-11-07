import { requireUserSession } from "../data/auth.server";
import { getExpenses } from "../data/expenses.server";

//if only loader in the file, load the data in the viewport
export async function loader({ request }) {
  const userId = await requireUserSession(request);
  return getExpenses(userId);
}
