import { CountPostLikesRepository, CountProfileLikesRepository } from "@/data/protocols/db";

export class LikeMongoRepository implements CountPostLikesRepository, CountProfileLikesRepository {
    async countLikeByPostId(params: CountPostLikesRepository.Params): Promise<CountPostLikesRepository.Result> {
        return 0;
    }

    async countByProfileId(params: CountProfileLikesRepository.Params): Promise<CountProfileLikesRepository.Result> {
        return 0;
    }
}
