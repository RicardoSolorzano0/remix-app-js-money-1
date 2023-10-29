
import authStyles from "../styles/auth.css";

export default function Auth(){
    return <h1>Auth</h1>
}


export function links() {
    return [{ rel: "stylesheet", href: authStyles }];
  }