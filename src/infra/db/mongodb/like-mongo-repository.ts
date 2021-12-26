import { GetLikeCountByPostIdRepository, GetLikeCountByProfileIdRepository } from "@/data/protocols/db";

export class LikeMongoRepository implements GetLikeCountByPostIdRepository, GetLikeCountByProfileIdRepository {
    async countLikeByPostId(params: GetLikeCountByPostIdRepository.Params): Promise<GetLikeCountByPostIdRepository.Result> {
        return 0;
    }

    async countByProfileId(params: GetLikeCountByProfileIdRepository.Params): Promise<GetLikeCountByProfileIdRepository.Result> {
        return 0;
    }
}
