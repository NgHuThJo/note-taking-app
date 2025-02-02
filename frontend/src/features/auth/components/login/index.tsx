import { useState, FormEvent } from "react";
import { trpc } from "#frontend/lib/trpc";
import { Button } from "#frontend/components/ui/button/button";
import { Logo } from "#frontend/components/ui/image/icon/icon";
import { loginSchema } from "#shared/types/frontend-zod";

export function Login() {
  const { mutate, isPending, error } = trpc.auth.loginUser.useMutation();

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = Object.fromEntries(new FormData(event.currentTarget));

    mutate;
  };

  return (
    <div>
      <div>
        <Logo />
        <p>Notes</p>
      </div>
      <h1>Welcome to Note</h1>
      <h1>hello world</h1>
      <p>Please log in to continue</p>
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email address
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email@example.com"
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
        </label>
        <Button type="submit">Login</Button>
      </form>
      <p></p>
    </div>
  );
}
