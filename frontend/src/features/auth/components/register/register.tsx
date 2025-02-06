import { useState, FormEvent } from "react";
import { Link } from "react-router";
import { Button } from "#frontend/components/ui/button/button";
import { FormErrorMessage } from "#frontend/components/ui/form/message/error";
import { Logo } from "#frontend/components/ui/image/icon/icon";
import { trpc } from "#frontend/lib/trpc";
import { SchemaError } from "#frontend/types/zod";
import { loginSchema } from "#shared/types/auth";

export function Registration() {
  const [fieldErrors, setFieldErrors] = useState<
    SchemaError<typeof loginSchema>
  >({});
  const { mutate, isPending, error } = trpc.auth.registerUser.useMutation();

  if (isPending) {
    return <p>Loading...</p>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
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
      <h1>Create Your Account</h1>
      <p>Sign up to start organizing your notes and boost your productivity.</p>
      <form method="post" onSubmit={handleSubmit}>
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
        <Button type="submit">Sign up</Button>
        {error && <p>{error.message}</p>}
      </form>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
