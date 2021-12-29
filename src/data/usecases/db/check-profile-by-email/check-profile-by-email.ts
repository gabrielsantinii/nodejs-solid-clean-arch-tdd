import { CheckProfileByEmailRepository } from "@/data/protocols/db";
import { CheckProfileByEmail } from "@/domain/usecases";

export class DbCheckProfileByEmail implements CheckProfileByEmail {
    constructor(private readonly checkProfileByEmailRepository: CheckProfileByEmailRepository) {}

    async perform(params: CheckProfileByEmail.Params): Promise<CheckProfileByEmail.Result> {
        const profile = await this.checkProfileByEmailRepository.checkByEmail({ email: params.email });
        return !!profile;
    }
}