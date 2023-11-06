import {
  Link,
  NavLink,
  useLoaderData,
  Form,
  useLocation,
} from "@remix-run/react";
import Logo from "../util/Logo";

function MainHeader() {
  const userId = useLoaderData();
  const location = useLocation();
  console.log("veamos en donde estamos en todo momento", location);

  return (
    <header id="main-header">
      <Logo />
      <nav id="main-nav">
        {location.pathname !== "/expenses" ? (
          <>
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/pricing">Pricing</NavLink>
              </li>
              {/* <li>
            <NavLink to="/expenses">Expenses</NavLink>
          </li> */}
            </ul>
          </>
        ) : (
          <ul>
            <li>
              <NavLink to="/expenses" end>
                Manage Expenses
              </NavLink>
            </li>
            <li>
              <NavLink to="/expenses/analysis">Analyze Expenses</NavLink>
            </li>
          </ul>
        )}
      </nav>
      <nav id="cta-nav">
        <ul>
          <li>
            {userId && (
              <Form method="post" action="/logout" id="logout-form">
                <button className="cta-alt">Logout</button>
              </Form>
            )}
            {!userId && (
              <Link to="/auth" className="cta">
                Login
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
