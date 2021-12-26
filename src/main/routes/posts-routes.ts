import express from "express";
import { adaptRoute } from "@/main/adapters";
import { makeLoadRecentPostsController } from "../factories/controllers";

export const postsRoutes = (router: express.Router): void => {
    router.get("./posts", adaptRoute(makeLoadRecentPostsController()));
};
