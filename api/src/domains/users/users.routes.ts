import { Router } from "express";
import * as controller from "./users.controller.js";
import { validateSchema } from "../../middlewares/validateSchema.js";
import { insertUserSchema } from "./users.schema.js";
import { requireAuth } from "../../middlewares/requireAuth.js";

export const usersRouter = Router();

// Create a new user
usersRouter.post("/", requireAuth, validateSchema(insertUserSchema), controller.createUserHandler);

// Update user by ID
usersRouter.patch("/:id", requireAuth, validateSchema(insertUserSchema.partial()), controller.updateUserHandler);

// Delete a user by ID
usersRouter.delete("/:id", requireAuth, controller.deleteUserHandler);
