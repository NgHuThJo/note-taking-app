import { createRoutesStub } from "react-router";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Registration } from "#frontend/features/auth/components/register/register";
import { createTestTRPCandQueryClients } from "#frontend/test/mocks/react-query";

describe("registration", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let Stub: ReturnType<typeof createRoutesStub>;

  const routes = [
    {
      path: "/register",
      Component: Registration,
    },
  ];

  it("should redirect to login after successful registration", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(
      createTestTRPCandQueryClients(<Stub initialEntries={["/register"]} />),
    );

    const email = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    await user.type(email, "email@example.com");
    await user.type(password, "password");
    await user.click(submitButton);

    expect(screen.queryByText(/create your account/i)).not.toBeNull();
  });

  it("should show error messages from invalid input", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(
      createTestTRPCandQueryClients(<Stub initialEntries={["/register"]} />),
    );

    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(screen.getByText(/invalid email address/i));
    expect(screen.getByText(/password must have at least 8 characters/i));
  });
});
