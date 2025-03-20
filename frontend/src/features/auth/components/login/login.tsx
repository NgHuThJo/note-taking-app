import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router";
import { trpc } from "#frontend/lib/trpc";
import { Button } from "#frontend/components/ui/button/button";
import { FormErrorMessage } from "#frontend/components/ui/form/message/error";
import { Logo } from "#frontend/components/ui/image/icon/icon";
import { loginSchema } from "#shared/types/auth";
import { SchemaError } from "#frontend/types/zod";

export function Login() {
  const [fieldErrors, setFieldErrors] = useState<
    SchemaError<typeof loginSchema>
  >({});
  const navigate = useNavigate();
  const { mutate, isPending, error } = trpc.auth.loginUser.useMutation();

  if (isPending) {
    return <p>Loading...</p>;
  }

  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const parsedSchema = loginSchema.safeParse(formData);

    if (!parsedSchema.success) {
      setFieldErrors(parsedSchema.error.flatten().fieldErrors);
      return;
    }

    mutate(parsedSchema.data, {
      onSuccess: () => {
        setFieldErrors({});
        return navigate("/home/all-notes");
      },
      onError: (error) => {
        console.error(error.message);
      },
    });
  };

  return (
    <div>
      <div>
        <Logo />
        <p>Notes</p>
      </div>
      <h1>Welcome to Note</h1>
      <p>Please log in to continue.</p>
      <form method="post" onSubmit={handleLogin}>
        <label htmlFor="email">
          Email address
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
          />
          {fieldErrors?.email && <FormErrorMessage error={fieldErrors.email} />}
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          {fieldErrors?.password && (
            <FormErrorMessage error={fieldErrors?.password} />
          )}
        </label>
        <Button type="submit" disabled={isPending}>
          Login
        </Button>
        {error && <p>{error.message}</p>}
      </form>
      <p>
        No account yet? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
}
