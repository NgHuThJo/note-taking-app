import { createBrowserRouter, RouterProvider } from "react-router";
import { AuthLayout } from "#frontend/features/auth/components/layout/layout";
import { ErrorRoute } from "#frontend/app/routes/error";
import { NotFoundRoute } from "#frontend/app/routes/not-found";
import { ColorSettings } from "#frontend/features/settings/components/color/color";
import { Home } from "#frontend/features/home/components/home";
import { Login } from "#frontend/features/auth/components/login/login";
import { Note } from "#frontend/features/note/components/note";
import { NoteArchive } from "#frontend/features/note/components/archive/archive";
import { NoteEditForm } from "#frontend/features/note/components/edit/edit";
import { NoteForm } from "#frontend/features/note/components/form/form";
import { Registration } from "#frontend/features/auth/components/register/register";
import { Settings } from "#frontend/features/settings/components/settings";

export const routesConfig = [
  {
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      {
        path: "/",
        element: <AuthLayout />,
        children: [
          {
            path: "/home",
            element: <Home />,
            children: [
              {
                path: "all-notes",
                element: <Note />,
                children: [
                  {
                    path: "create",
                    element: <NoteForm />,
                  },
                  {
                    path: ":id",
                    element: <NoteEditForm />,
                  },
                ],
              },
              {
                path: "archived-notes",
                element: <NoteArchive />,
                children: [
                  {
                    path: "create",
                    element: <NoteForm />,
                  },
                  {
                    path: ":id",
                    element: <NoteEditForm />,
                  },
                ],
              },
              {
                path: "settings",
                element: <Settings />,
                children: [
                  {
                    path: "color",
                    element: <ColorSettings />,
                  },
                ],
              },
            ],
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
