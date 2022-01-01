import { AddProfileController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeCheckProfileByEmail, makeCheckProfileByUsername, makeAddProfile, makeAddAuth } from "@/main/factories/usecases";

export const makeAddProfileController = (): Controller => {
    const controller = new AddProfileController(makeCheckProfileByEmail(), makeCheckProfileByUsername(), makeAddProfile(), makeAddAuth());
    return controller;
};
