import express from "express";
import { adaptRoute, adaptMiddleware } from "@/main/adapters";
import { makeLoadRecentPostsController } from "@/main/factories/controllers";
import { makeAddAccountValidationMiddleware } from "@/main/factories/middlewares";

export const postsRoutes = (router: express.Router): void => {
    router.get("/posts", adaptRoute(makeLoadRecentPostsController()));
    router.post("/posts", adaptMiddleware(makeAddAccountValidationMiddleware()))
};
