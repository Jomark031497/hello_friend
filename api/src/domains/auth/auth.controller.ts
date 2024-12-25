import type { Request, Response, NextFunction } from "express";
import * as authService from "./auth.service.js";
import {
  deleteSessionTokenCookie,
  createSessionAndSetCookie,
} from "./auth.utils.js";

export const loginUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.loginUser(req.body);
    await createSessionAndSetCookie(res, user.id);
    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};

export const signUpUserHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await authService.signUpUser(req.body);
    await createSessionAndSetCookie(res, user.id);
    return res.status(201).json(user);
  } catch (error) {
    return next(error);
  }
};

export const getAuthenticatedUserHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await authService.getAuthenticatedUser(res.locals.user.id);
    return res.status(200).json(data);
  } catch (error) {
    return next(error);
  }
};

export const logoutUserHandler = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    deleteSessionTokenCookie(res);
    return res.status(200).json({ message: "logout success" });
  } catch (error) {
    return next(error);
  }
};
