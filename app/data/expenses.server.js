import { prisma } from "./database.server";

export async function addExpense(expenseData) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getExpenses() {
  try {
    // here find many arguments for find modify and elimanted documents
    return await prisma.expense.findMany({ orderBy: { date: "desc" } });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findFirst({ where: { id: id } });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function updateExpense(id, expenseData) {
  try {
    return await prisma.expense.update({
      where: { id: id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
      },
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}
