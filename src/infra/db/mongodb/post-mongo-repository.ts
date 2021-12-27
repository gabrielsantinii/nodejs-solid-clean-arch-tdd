import { LoadRecentPostsRepository } from "@/data/protocols/db";

export class PostMongoRepository implements LoadRecentPostsRepository {
    async loadWithLimit(params: LoadRecentPostsRepository.Params): Promise<LoadRecentPostsRepository.Result> {
        return [];
    }
}
