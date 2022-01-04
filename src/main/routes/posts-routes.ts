import express from "express";
import { auth } from "@/main/middlewares";
import { adaptMiddleware, adaptRoute } from "@/main/adapters";
import { makeLoadRecentPostsController, makeAddPostController } from "@/main/factories/controllers";
import { makeAddPostValidationMiddleware, makeIdFieldValidationMiddleware } from "@/main/factories/middlewares";

export const postsRoutes = (router: express.Router): void => {
    router.get("/posts", [auth, adaptRoute(makeLoadRecentPostsController())]);
    router.post("/posts", [
        auth,
        adaptMiddleware(makeAddPostValidationMiddleware()),
        adaptMiddleware(makeIdFieldValidationMiddleware("authorId")),
        adaptRoute(makeAddPostController()),
    ]);
};
