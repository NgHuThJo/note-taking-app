import { createFileRoute } from "@tanstack/react-router";
import { Login } from "#frontend/features/auth/components/login";

export const Route = createFileRoute("/")({
  component: Login,
});
