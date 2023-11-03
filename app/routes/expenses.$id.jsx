import { useNavigate } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { updateExpense } from "../data/expenses.server";
import { validateExpenseInput } from "../data/validation.server";
// import { getExpense } from "../data/expenses.server";
export default function UpdateExpensesPage() {
  const navigate = useNavigate();

  function closeHandler() {
    navigate("..");
  }

  return (
    <Modal onClose={closeHandler}>
      <ExpenseForm />
    </Modal>
  );
}
//It already exists with the information that it loads from the beginning, we save this part
// export async function loader({ params }) {
//   const expenseId = params.id;
//   return await getExpense(expenseId);
// }

export async function action({ params, request }) {
  const expenseId = params.id;
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (e) {
    return e;
  }

  await updateExpense(expenseId, expenseData);
  return redirect("/expenses");
}
