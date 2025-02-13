import { createBrowserRouter, RouterProvider } from "react-router";
import { ErrorRoute } from "#frontend/app/routes/error";
import { NotFoundRoute } from "#frontend/app/routes/not-found";
import { Home } from "#frontend/features/home/components/home";
import { Login } from "#frontend/features/auth/components/login/login";
import { Note } from "#frontend/features/note/components/note";
import { Registration } from "#frontend/features/auth/components/register/register";

export const routesConfig = [
  {
    errorElement: <ErrorRoute />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/home",
        element: <Home />,
        children: [
          {
            index: true,
            element: <Note />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundRoute />,
  },
];

export function Router() {
  const router = createBrowserRouter(routesConfig);

  return <RouterProvider router={router} />;
}
