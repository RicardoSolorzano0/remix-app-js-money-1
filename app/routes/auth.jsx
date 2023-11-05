import AuthForm from "../components/auth/AuthForm";
import MainHeader from "../components/navigation/MainHeader";
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
    //logic for login
  } else {
    //logic for sign in
  }
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
