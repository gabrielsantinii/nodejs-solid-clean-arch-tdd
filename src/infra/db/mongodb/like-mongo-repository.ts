import { GetPostLikeCountRepository, GetProfileLikeCountRepository } from "@/data/protocols/db";

export class LikeMongoRepository implements GetPostLikeCountRepository, GetProfileLikeCountRepository {
    async countLikeByPostId(params: GetPostLikeCountRepository.Params): Promise<GetPostLikeCountRepository.Result> {
        return 0;
    }

    async countByProfileId(params: GetProfileLikeCountRepository.Params): Promise<GetProfileLikeCountRepository.Result> {
        return 0;
    }
}
