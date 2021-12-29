import { AddProfileController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { makeCheckProfileByEmail, makeCheckProfileByUsername, makeAddProfile } from "@/main/factories/usecases";

export const makeAddProfileController = (): Controller => {
    const controller = new AddProfileController(makeCheckProfileByEmail(), makeCheckProfileByUsername(), makeAddProfile());
    return controller;
};
