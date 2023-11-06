import { redirect } from "@remix-run/node";
import AuthForm from "../components/auth/AuthForm";
import MainHeader from "../components/navigation/MainHeader";
import { login, signup } from "../data/auth.server";
import { validateCredentials } from "../data/validation.server";
import authStyles from "../styles/auth.css";

export default function Auth() {
  return (
    <>
      <MainHeader />
      <AuthForm />
    </>
  );
}
export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";

  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    validateCredentials(credentials);
  } catch (error) {
    return error;
  }

  //validate user input
  if (authMode === "login") {
    return await login(credentials);
  } else {
    return await signup(credentials);
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
