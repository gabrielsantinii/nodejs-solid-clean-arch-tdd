import { AddProfile, CheckProfileByEmail, CheckProfileByUsername } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors/custom-param-error";
import { badRequest, created, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class AddProfileController implements Controller {
    constructor(
        private readonly checkProfileByEmail: CheckProfileByEmail,
        private readonly checkProfileByUsername: CheckProfileByUsername,
        private readonly addProfile: AddProfile
    ) {}

    async handle(request: AddProfileController.Request): Promise<AddProfileController.Result> {
        try {
            const existsByEmail = await this.checkProfileByEmail.perform({ email: request.email });
            if (existsByEmail) {
                return badRequest([new CustomParamError("The email already exists.")]);
            }

            const existsByUsername = await this.checkProfileByUsername.perform({ username: request.username });
            if (existsByUsername) {
                return badRequest([new CustomParamError("The username already exists.")]);
            }

            const createdProfile = await this.addProfile.perform(request);
            return created(createdProfile);
        } catch (err) {
            return serverError(err as Error);
        }
    }
}

export namespace AddProfileController {
    export type Request = AddProfile.Params;
    export type Result = HttpResponse;
}