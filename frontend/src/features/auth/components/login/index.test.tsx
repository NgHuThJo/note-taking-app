import { createRoutesStub } from "react-router";
import { act, screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Login } from "#frontend/features/auth/components/login";

describe("login", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let Stub: ReturnType<typeof createRoutesStub>;

  const routes = [
    {
      path: "/",
      Component: Login,
    },
  ];

  it("should redirect to app after successful login", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(<Stub initialEntries={["/"]} />);

    const email = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.type(email, "email@example.com");
    await user.type(password, "password");
    await user.click(submitButton);

    expect(screen.queryByText(/welcome to note/i)).not.toBeNull();
  });

  it("should show error messages from invalid input", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(<Stub initialEntries={["/"]} />);

    const email = screen.getByLabelText(/email address/i);
    const password = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /login/i });

    await user.click(submitButton);

    expect(screen.getByText(/invalid email address/i));
    expect(screen.getByText(/wrong password/i));
  });
});
