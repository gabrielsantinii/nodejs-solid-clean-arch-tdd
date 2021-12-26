import { GetLikeCountByPostIdRepository } from "@/data/protocols/db";

export class LikeMongoRepository implements GetLikeCountByPostIdRepository {
    async countLikeByPostId(params: GetLikeCountByPostIdRepository.Params): Promise<GetLikeCountByPostIdRepository.Result> {
        return 0;
    }
}
