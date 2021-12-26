import { GetPostLikeCountRepository } from "@/data/protocols/db";
import { GetPostLikeCount } from "@/domain/usecases";

export class DbGetPostLikeCount implements GetPostLikeCount {
    constructor(private readonly GetPostLikeCountRepository: GetPostLikeCountRepository) {}
    async perform({ postId }: { postId: string }) {
        return this.GetPostLikeCountRepository.countLikeByPostId({ postId });
    }
}
