import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import MainHeader from "./components/navigation/MainHeader";
import sharedStyles from "./styles/shared.css";
import Error from "./components/util/Error";
import { getUserFromSession } from "./data/auth.server";

export function links() {
  return [{ rel: "stylesheet", href: sharedStyles }];
}

export function meta() {
  return [
    { title: "MoneyApp" },
    { name: "description", content: "First paginate" },
    // { property: "og:title", content: "..." },

    // // you can now add SEO related <links>
    // { tagName: "link", rel: "canonical", href: "..." },

    // // and <script type=ld+json>
    // {
    //   "script:ld+json": {
    //     some: "value",
    //   },
    // },
  ];
}

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <title>Remix Money</title>
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
        <MainHeader />
        {children}
        <ScrollRestoration />
        {/* eliminate this for performing and disable js */}
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

export function loader({ request }) {
  return getUserFromSession(request);
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
