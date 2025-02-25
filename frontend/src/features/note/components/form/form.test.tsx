import { createRoutesStub } from "react-router";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createTestTRPCandQueryClients } from "#frontend/test/mocks/react-query";
import { NoteEditForm } from "#frontend/features/note/components/edit/edit";

describe("NoteForm", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let Stub: ReturnType<typeof createRoutesStub>;

  const routes = [
    {
      path: "/home/1",
      Component: NoteEditForm,
    },
  ];

  it("should show success message after valid submission", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(
      createTestTRPCandQueryClients(<Stub initialEntries={["/home/1"]} />),
    );

    const title = screen.getByPlaceholderText(/enter a title/i);
    const tags = screen.getByPlaceholderText(/add tags/i);
    const text = screen.getByPlaceholderText(/start typing your note here/i);
    const saveButton = screen.getByRole("button", { name: /save note/i });

    await user.type(title, "Title");
    await user.type(tags, "tag1, tag2");
    await user.type(text, "Hello, world!");
    await user.click(saveButton);

    expect(screen.getByText(/note saved/i)).toBeInTheDocument();
  });

  it("should show error messages after invalid submission", async () => {
    user = userEvent.setup();
    Stub = createRoutesStub(routes);

    render(
      createTestTRPCandQueryClients(
        <Stub initialEntries={["/home/create-note"]} />,
      ),
    );

    const saveButton = screen.getByRole("button", { name: /save note/i });

    await user.click(saveButton);

    expect(screen.getAllByText(/textfield is required/i)).not.toHaveLength(0);
  });
});
