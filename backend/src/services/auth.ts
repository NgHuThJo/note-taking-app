import { eq } from "drizzle-orm";
import { DatabaseError } from "pg";
import { db } from "#backend/db/index.js";
import { userTable, optionTable } from "#backend/db/schema.js";
import { AppError } from "#backend/utils/app-error.js";

class AuthService {
  async loginUser(email: string, password: string) {
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email))
      .limit(1);

    const foundUser = user[0] || null;

    if (!foundUser) {
      throw new AppError(
        "UNAUTHORIZED",
        `No user with email address "${email}" found`,
      );
    }

    if (foundUser.password !== password) {
      throw new AppError("UNAUTHORIZED", "Passwords do not match");
    }

    const { password: _userPassword, ...userData } = foundUser;

    return userData;
  }

  async registerUser(email: string, password: string) {
    try {
      const newUser = await db.transaction(async (tx) => {
        const [newUser] = await tx
          .insert(userTable)
          .values({ email, password })
          .returning();

        await tx.insert(optionTable).values({ userId: newUser.id });

        return newUser;
      });

      const { password: _userPassword, ...userData } = newUser;

      return userData;
    } catch (error) {
      if (error instanceof DatabaseError && error.code === "23505") {
        throw new AppError(
          "CONFLICT",
          `Email address "${email}" already in use`,
        );
      }

      throw new AppError("INTERNAL_SERVER_ERROR", "Failed to create user");
    }
  }
}

export const authService = new AuthService();
