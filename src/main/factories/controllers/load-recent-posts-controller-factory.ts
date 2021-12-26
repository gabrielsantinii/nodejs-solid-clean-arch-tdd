import { LoadRecentPostsController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeLoadFollowingAuthorsList, makeLoadRecentPosts } from "@/main/factories/usecases";

export const makeLoadRecentPostsController = (): Controller => {
    const controller = new LoadRecentPostsController(makeLoadFollowingAuthorsList(), makeLoadRecentPosts());
    return controller;
};
