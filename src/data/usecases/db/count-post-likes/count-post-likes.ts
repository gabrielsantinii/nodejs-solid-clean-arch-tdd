import { CountPostLikesRepository } from "@/data/protocols/db";
import { CountPostLikes } from "@/domain/usecases";

export class DbCountPostLikes implements CountPostLikes {
    constructor(private readonly CountPostLikesRepository: CountPostLikesRepository) {}
    async perform({ postId }: { postId: string }) {
        return this.CountPostLikesRepository.countLikeByPostId({ postId });
    }
}
