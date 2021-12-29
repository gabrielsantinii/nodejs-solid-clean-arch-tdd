import { AddProfile, CheckProfileByEmail, CheckProfileByUsername } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
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
                return httpResponse.badRequest([new CustomParamError("The email already exists.")]);
            }

            const existsByUsername = await this.checkProfileByUsername.perform({ username: request.username });
            if (existsByUsername) {
                return httpResponse.badRequest([new CustomParamError("The username already exists.")]);
            }

            const createdProfile = await this.addProfile.perform(request);
            return httpResponse.created(createdProfile);
        } catch (err) {
            return httpResponse.serverError(err as Error);
        }
    }
}

export namespace AddProfileController {
    export type Request = AddProfile.Params;
    export type Result = HttpResponse;
}
