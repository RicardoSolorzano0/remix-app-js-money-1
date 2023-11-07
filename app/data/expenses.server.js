import { prisma } from "./database.server";

export async function addExpense(expenseData, userId) {
  try {
    return await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date),
        User: { connect: { id: userId } },
      },
    });
  } catch (e) {
    throw new Error("Failed to add expense");
  }
}

export async function getExpenses(userId) {
  if (!userId) {
    throw new Error("Failded to get expenses");
  }
  try {
    // here find many arguments for find modify and elimanted documents
    return await prisma.expense.findMany({
      where: { userId: userId },
      orderBy: { date: "desc" },
    });
  } catch (e) {
    throw new Error("Failed to get expenses");
  }
}

export async function getExpense(id) {
  try {
    return await prisma.expense.findFirst({ where: { id: id } });
  } catch (e) {
    throw new Error("Failed to get expense");
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
    throw new Error("Failed to update expense");
  }
}

export async function deleteExpense(id) {
  try {
    return await prisma.expense.delete({
      where: { id: id },
    });
  } catch (e) {
    throw new Error("Failed to delete expense");
  }
}
