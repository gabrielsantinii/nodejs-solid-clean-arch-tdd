import { LoadProfileController } from "@/presentation/controllers";
import { makeLoadProfile, makeLoadPostsByAuthor, makeCountProfileLikes, makeCountPostLikes } from "@/main/factories/usecases";
import { Controller } from "@/presentation/protocols";

export const makeLoadProfileController = (): Controller => {
    const controller = new LoadProfileController(makeLoadProfile(), makeLoadPostsByAuthor(), makeCountProfileLikes(), makeCountPostLikes());
    return controller;
};
