import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import { initializeRoutes } from "./routes.js";

export const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  initializeRoutes(app);

  app.use(errorHandler);

  return app;
};
