import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { Context } from "#frontend/providers/context";
import { Router } from "#frontend/app/router";
import { trpc } from "#frontend/lib/trpc";
import "#frontend/assets/styles";

const root = document.getElementById("root");
if (!root) {
  throw new ReferenceError("DOM root not found");
}

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: import.meta.env.VITE_API_URL,
      fetch: (url, options) => {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Context>
          <Router />
        </Context>
      </QueryClientProvider>
    </trpc.Provider>
  </React.StrictMode>,
);
