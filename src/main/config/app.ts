import express from "express";
import { setupRoutes, setupMiddlewares } from "@/main/config";

export const setupApp = (): express.Application => {
    const app = express();
    setupMiddlewares(app)
    setupRoutes(app);
    return app;
};
