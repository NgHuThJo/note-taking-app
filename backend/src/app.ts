// Third party
import http from "node:http";
import cors from "cors";
import express, { ErrorRequestHandler } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import session from "express-session";
import { appRouter } from "#backend/routers/api.js";
import { createContext, redisStore } from "./routers/trpc.js";
import logger from "#backend/utils/logger.js";

// Entry point file
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  logger.debug(`Server listening on port ${port}`);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "*",
    // origin: process.env.PROXY_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET!,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

// Routes
app.use(
  "/api",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

// Error handler
const errorHandler: ErrorRequestHandler = (err, _req, _res, _next) => {
  logger.error(err);
};

app.use(errorHandler);
