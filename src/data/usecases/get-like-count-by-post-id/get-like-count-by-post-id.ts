import { GetLikeCountByPostIdRepository } from "@/data/protocols/db";
import { GetLikeCountByPostId } from "@/domain/usecases";

export class DbGetLikeCountByPostId implements GetLikeCountByPostId {
    constructor(private readonly getLikeCountByPostIdRepository: GetLikeCountByPostIdRepository) {}
    async perform({ postId }: { postId: string }) {
        return this.getLikeCountByPostIdRepository.countLikeByPostId({ postId });
    }
}
