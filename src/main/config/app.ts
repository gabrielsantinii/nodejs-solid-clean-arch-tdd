import express from "express";
import { setupRoutes } from "@/main/config/routes";

export const setupApp = async (): Promise<express.Application> => {
    const app = express();
    setupRoutes(app);
    return app;
};
