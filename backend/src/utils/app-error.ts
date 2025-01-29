import { TRPCError } from "@trpc/server";
import { TRPC_ERROR_CODE_KEY } from "@trpc/server/rpc";
import logger from "#backend/utils/logger.js";

export class AppError extends Error {
  readonly code: TRPC_ERROR_CODE_KEY;

  constructor(code: TRPC_ERROR_CODE_KEY, message: string) {
    super(message);
    this.code = code;
    this.name = "AppError";
  }

  static logError(error: unknown) {
    if (error instanceof AppError) {
      logger.error(`${error.name}:`, error.code, error.cause, error.message);
      throw new TRPCError({
        code: error.code,
        message: error.message,
      });
    }

    if (error instanceof Error) {
      logger.error(`${error.name}:`, error.cause, error.message);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Unexpected error",
      });
    }

    logger.error(`Unknown error: ${error}`);
  }
}
