import { prisma } from "./database.server";

export async function addExpense(expenseData) {
  try {
    return await prisma.expenses.create({
      data: {
        title: expenseData.title,
        amount: expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
