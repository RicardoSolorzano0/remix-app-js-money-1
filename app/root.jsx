import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import MainHeader from "./components/navigation/MainHeader";
import sharedStyles from "./styles/shared.css";
import Error from "./components/util/Error";

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

function Document({ title, children }) {
  const path = useLocation();
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>{title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <Links />
      </head>
      <body>
        {path.pathname === "/" ? <MainHeader /> : null}
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet></Outlet>
    </Document>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <Document title={"An error occurred"}>
      <main>
        <Error title={"An error occurred"}>
          <p>{error.Error || "Something went wrong. Please try again"}</p>
          {isRouteErrorResponse}
          <p>
            Back to <Link to="/">safety</Link>.
          </p>
        </Error>
      </main>
    </Document>
  );
}
