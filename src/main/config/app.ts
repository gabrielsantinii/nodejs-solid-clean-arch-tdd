import express from "express";
import { setupRoutes } from "@/main/config";

export const setupApp = (): express.Application => {
    const app = express();
    setupRoutes(app);
    return app;
};
