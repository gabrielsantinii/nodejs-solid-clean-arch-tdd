import { CheckProfileByUsernameRepository } from "@/data/protocols/db";
import { CheckProfileByUsername } from "@/domain/usecases";

export class DbCheckProfileByUsername implements CheckProfileByUsername {
    constructor(private readonly checkProfileByUsernameRepository: CheckProfileByUsernameRepository) {}

    async perform(params: CheckProfileByUsername.Params): Promise<CheckProfileByUsername.Result> {
        const profile = await this.checkProfileByUsernameRepository.checkByUsername({ username: params.username });
        return !!profile;
    }
}