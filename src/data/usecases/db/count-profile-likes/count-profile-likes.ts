import { CountProfileLikesRepository } from "@/data/protocols/db";
import { CountProfileLikes } from "@/domain/usecases";

export class DbCountProfileLikes implements CountProfileLikes {
    constructor(private readonly CountProfileLikesRepository: CountProfileLikesRepository) {}

    async perform(params: CountProfileLikes.Params): Promise<CountProfileLikes.Result> {
        return this.CountProfileLikesRepository.countByProfileId({ profileId: params.profileId });
    }
}
