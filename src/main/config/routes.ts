import express from "express";
import { postsRoutes, profileRoutes } from "@/main/routes";

export const setupRoutes = (app: express.Application): void => {
    const router = express.Router();
    postsRoutes(router);
    profileRoutes(app);
    app.use("/", router);
};
