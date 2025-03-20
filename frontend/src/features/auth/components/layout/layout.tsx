import { Navigate, Outlet } from "react-router";
import { trpc } from "#frontend/lib/trpc";

export function AuthLayout() {
  const { isPending, error } = trpc.auth.isAuthenticated.useQuery(undefined, {
    retry: false,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
