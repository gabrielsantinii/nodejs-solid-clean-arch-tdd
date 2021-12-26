import express from "express";
import { postsRoutes } from "@/main/routes";

export const setupRoutes = (app: express.Application): void => {
    const router = express.Router();
    postsRoutes(router)
    app.use("/", router);
};
