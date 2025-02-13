import { http, HttpResponse } from "msw";
import { createTRPCShape } from "#frontend/test/mocks/node";

const apiUrl = import.meta.env.VITE_API_URL;

export const authHandlers = [
  http.post(`${apiUrl}/auth.loginUser`, () => {
    return HttpResponse.json(
      createTRPCShape({
        email: "email@email.com",
        id: 1,
      }),
    );
  }),
  http.post(`${apiUrl}/auth.registerUser`, () => {
    return HttpResponse.json(
      createTRPCShape({
        email: "email@email.com",
        id: 1,
      }),
    );
  }),
];
