import { authHandlers } from "#frontend/test/mocks/handlers/auth";
import { noteHandlers } from "#frontend/test/mocks/handlers/note";

export const handlers = [...authHandlers, ...noteHandlers];
