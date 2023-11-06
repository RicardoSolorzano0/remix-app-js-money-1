import { useNavigate } from "@remix-run/react";
import ExpenseForm from "../components/expenses/ExpenseForm";
import Modal from "../components/util/Modal";
import { addExpense } from "../data/expenses.server";
import { redirect } from "@remix-run/node";
import { validateExpenseInput } from "../data/validation.server";

export default function ExpensesAdd() {
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

export async function action({ request }) {
  const formData = await request.formData();
  const expenseData = Object.fromEntries(formData);

  try {
    validateExpenseInput(expenseData);
  } catch (err) {
    return err;
  }

  await addExpense(expenseData);
  return redirect("/expenses");
}

//testing that it always loads even if the route is protected
// export function loader() {
//   console.log("add loader");
//   return null;
// }
