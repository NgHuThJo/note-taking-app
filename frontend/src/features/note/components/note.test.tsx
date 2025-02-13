import { createRoutesStub } from "react-router";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "#frontend/features/home/components/home";
import { createTestTRPCandQueryClients } from "#frontend/test/mocks/react-query";

describe("Note", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let Stub: ReturnType<typeof createRoutesStub>;

  const routes = [
    {
      path: "/home",
      Component: Home,
    },
  ];
});
