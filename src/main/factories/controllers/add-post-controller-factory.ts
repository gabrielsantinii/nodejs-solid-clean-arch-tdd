import { Controller } from "@/presentation/protocols";
import { AddPostController } from "@/presentation/controllers";
import { makeAddPost, makeLoadProfile } from "@/main/factories/usecases";

export const makeAddPostController = (): Controller => {
    const controller = new AddPostController(makeLoadProfile(), makeAddPost());
    return controller;
};
