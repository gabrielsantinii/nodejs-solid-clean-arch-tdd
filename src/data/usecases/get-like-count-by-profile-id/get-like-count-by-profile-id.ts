import { GetLikeCountByProfileIdRepository } from "@/data/protocols/db";
import { GetLikeCountByProfileId } from "@/domain/usecases";

export class DbGetLikeCountByProfileId implements GetLikeCountByProfileId {
    constructor(private readonly getLikeCountByProfileIdRepository: GetLikeCountByProfileIdRepository) {}

    async perform(params: GetLikeCountByProfileId.Params): Promise<GetLikeCountByProfileId.Result> {
        return this.getLikeCountByProfileIdRepository.countByProfileId({ profileId: params.profileId });
    }
}