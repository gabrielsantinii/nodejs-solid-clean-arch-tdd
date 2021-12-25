import { GetLikeCountByPostIdRepository } from "@/data/protocols/db";

export class LikeMongoRepository implements GetLikeCountByPostIdRepository {
    async countLikeByPostId({
        postId,
    }: GetLikeCountByPostIdRepository.Params): Promise<GetLikeCountByPostIdRepository.Result> {
        return 0;
    }
}
