import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import bcrypt from "bcryptjs";

// const SESSION_SECRET = process.env.SESSION_SECRET; no take this line fix this part

const sessionStorage = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: ["NOLAVASADIVINARCABRON"],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

async function createUserSession(userId, redirectPath) {
  const session = await sessionStorage.getSession();
  session.set("userId", userId);
  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session),
    },
  });
}

export async function getUserFromSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function destroyUserSession(request) {
  const session = await sessionStorage.getSession(
    request.headers.get("Cookie")
  );

  return redirect("/", {
    headers: { "Set-Cookie": await sessionStorage.destroySession(session) },
  });
}

export async function requireUserSession(request) {
  const userId = await getUserFromSession(request);

  if (!userId) {
    throw redirect("/auth?mode=login");
  }
}

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
  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });
  return createUserSession(user.id, "/expenses");
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
  return createUserSession(existingUser.id, "/expenses");
}
