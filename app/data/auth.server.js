import { prisma } from "./database.server";
import { createCookieSessionStorage } from "@remix-run/node";
import bcrypt from "bcryptjs";

const SESSION_SECRET = process.env.SESSION_SECRET;

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

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

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (!existingUser) {
    const error = new Error(`Could not find a user with the provided email`);
    error.status = 401;
    throw error;
  }

  const passwordCorrect = await bcrypt.compare(password, existingUser.password);

  if (!passwordCorrect) {
    const error = new Error(`Could not find a user with the provided email`);
    error.status = 401;
    throw error;
  }
}
