import { eq } from "drizzle-orm";
import { db } from "#backend/db/index.js";
import { userTable } from "#backend/db/schema.js";
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
    const user = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (user.length > 0) {
      throw new AppError("CONFLICT", `Email address "${email}" already in use`);
    }

    const [newUser] = await db
      .insert(userTable)
      .values({ email, password })
      .returning();

    const { password: _userPassword, ...userData } = newUser;

    return userData;
  }
}

export const authService = new AuthService();
