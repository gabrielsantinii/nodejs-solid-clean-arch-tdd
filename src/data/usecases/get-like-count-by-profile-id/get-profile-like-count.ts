import { GetProfileLikeCountRepository } from "@/data/protocols/db";
import { GetProfileLikeCount } from "@/domain/usecases";

export class DbGetProfileLikeCount implements GetProfileLikeCount {
    constructor(private readonly GetProfileLikeCountRepository: GetProfileLikeCountRepository) {}

    async perform(params: GetProfileLikeCount.Params): Promise<GetProfileLikeCount.Result> {
        return this.GetProfileLikeCountRepository.countByProfileId({ profileId: params.profileId });
    }
}
