import { http, HttpResponse } from "msw";
import { createTRPCShape } from "#frontend/test/mocks/node";

const apiUrl = import.meta.env.VITE_API_URL;

export const noteHandlers = [
  http.post(`${apiUrl}/note.createNote`, () => {
    return HttpResponse.json(
      createTRPCShape({
        id: 1,
        authorId: 1,
        title: "Hello, world!",
        tags: ["tag1", "tag2"],
        content: "Yo!",
        updatedAt: new Date(),
        status: "active",
      }),
    );
  }),
  http.post(`${apiUrl}/note.getAllNotes`, () => {
    return HttpResponse.json(createTRPCShape({}));
  }),
];
