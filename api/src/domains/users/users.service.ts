import type { NewUser, User } from "./users.schema.js";
import { users } from "./users.schema.js";
import { Argon2id } from "oslo/password";
import { db } from "../../db/dbInstance.js";
import { excludeFields } from "../../utils/excludeFields.js";
import { AppError } from "../../utils/AppError.js";
import { eq } from "drizzle-orm";

export const getUsers = async () => {
  return await db.query.users.findMany({
    columns: { password: false },
  });
};

export const getUser = async (field: keyof User, value: string, returnError: boolean = true) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users[field], value),
    columns: {
      password: false,
    },
  });

  if (!user && (returnError ?? true)) throw new AppError(404, `${field} not found`);

  return user;
};

export const createUser = async (payload: NewUser) => {
  const errors: Record<string, unknown> = {};
  let emailExists;
  let hashedPassword;

  const usernameExists = await getUser("username", payload.username, false);
  if (payload.email) emailExists = await getUser("email", payload.email, false);

  if (usernameExists) errors.username = "username is already taken";
  if (emailExists) errors.email = "email is already taken";
  if (Object.keys(errors).length) throw new AppError(400, "create user failed", errors);

  if (payload.password) hashedPassword = await new Argon2id().hash(payload.password);

  const [user] = await db
    .insert(users)
    .values({
      ...payload,
      ...(hashedPassword && {
        password: hashedPassword,
      }),
    })
    .returning();

  if (!user) throw new AppError(400, "create user failed");

  return excludeFields(user, ["password"]);
};

export const updateUser = async (id: User["id"], payload: Partial<NewUser>) => {
  const existingUser = await getUser("id", id, false);
  if (!existingUser) throw new AppError(404, "update user failed. userId not found");

  if (payload.username) {
    const usernameExists = await getUser("username", payload.username, false);
    if (usernameExists)
      throw new AppError(400, "update user failed", {
        username: "username is already taken",
      });
  }

  if (payload.email) {
    const emailExists = await getUser("email", payload.email);
    if (emailExists)
      throw new AppError(400, "update user failed", {
        email: "email is already taken",
      });
  }

  if (payload.password) payload.password = await new Argon2id().hash(payload.password);

  const query = await db.update(users).set(payload).where(eq(users.id, id)).returning();
  if (!query[0]) throw new AppError(400, "update user failed");

  return excludeFields(query[0], ["password"]);
};

export const deleteUser = async (id: User["id"]) => {
  const existingUser = await getUser("id", id, false);
  if (!existingUser) throw new AppError(404, "delete user failed. userId not found");

  await db.delete(users).where(eq(users.id, id)).returning();

  return { message: "user deleted successfully" };
};
