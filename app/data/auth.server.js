import { prisma } from "./database.server";
import bcrypt from "bcryptjs";

export async function signup({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    const error = new Error(
      `A user with the provide email address exists alredy`
    );
    error.status = 422;
    throw error;
  }
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.user.create({ data: { email: email, password: passwordHash } });
}
