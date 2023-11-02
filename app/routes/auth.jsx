import AuthForm from "../components/auth/AuthForm";
import MainHeader from "../components/navigation/MainHeader";
import authStyles from "../styles/auth.css";

export default function Auth() {
  return (
    <>
      <MainHeader />
      <AuthForm />
    </>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: authStyles }];
}
