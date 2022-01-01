import express from "express";
import { adaptMiddleware, adaptRoute } from "@/main/adapters";

import { makeAddProfileValidationMiddleware, makeIdFieldValidationMiddleware } from "@/main/factories/middlewares";
import { makeAddProfileController, makeLoadProfileController } from "@/main/factories/controllers";

export const profileRoutes = (app: express.Application): void => {
    app.get("/profiles/:profileId", adaptMiddleware(makeIdFieldValidationMiddleware("profileId")), adaptRoute(makeLoadProfileController()));
    app.post("/profiles", [adaptMiddleware(makeAddProfileValidationMiddleware()), adaptRoute(makeAddProfileController())]);
};
