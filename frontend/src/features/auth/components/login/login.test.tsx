import { createRoutesStub } from "react-router";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Home } from "#frontend/features/home/components/home";
import { Login } from "#frontend/features/auth/components/login/login";
import { createTestTRPCandQueryClients } from "#frontend/test/mocks/react-query";

describe("login", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let Stub: ReturnType<typeof createRoutesStub>;

  const routes = [
    {
      path: "/",
      Component: Login,
    },
    {
      path: "/home",
      Component: Home,
    },
  ];

  it("should redirect to app after successful login", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(createTestTRPCandQueryClients(<Stub initialEntries={["/"]} />));

    const email = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(email, "email@example.com");
    await user.type(password, "password");
    await user.click(submitButton);

    expect(screen.queryByText(/welcome to note/i)).toBeNull();
  });

  it("should show error messages from invalid input", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(createTestTRPCandQueryClients(<Stub initialEntries={["/"]} />));

    const email = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(screen.getByText(/email address is invalid/i));
    expect(screen.getByText(/password must have at least 8 characters/i));
  });
});
