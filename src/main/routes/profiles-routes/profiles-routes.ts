import express from "express";
import { adaptMiddleware, adaptRoute } from "@/main/adapters";

import { makeAddProfileValidationMiddleware, makeIdFieldValidationMiddleware } from "@/main/factories/middlewares";
import { makeAddProfileController, makeLoadProfileController } from "@/main/factories/controllers";

export const profileRoutes = (router: express.Router): void => {
    router.post("/profiles", [adaptMiddleware(makeAddProfileValidationMiddleware()), adaptRoute(makeAddProfileController())]);
    router.get("/profiles/:profileId", [
        adaptMiddleware(makeIdFieldValidationMiddleware("profileId")),
        adaptRoute(makeLoadProfileController()),
    ]);
};
