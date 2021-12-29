import express from "express";
import { adaptMiddleware } from "@/main/adapters";

import { makeAddProfileValidationMiddleware } from "@/main/factories/middlewares";

export const profileRoutes = (router: express.Router): void => {
    router.post("/profiles", adaptMiddleware(makeAddProfileValidationMiddleware()));
};
