import { LoadPostsByAuthorRepository, LoadRecentPostsRepository } from "@/data/protocols/db";

export class PostMongoRepository implements LoadRecentPostsRepository, LoadPostsByAuthorRepository {
    async loadWithLimit(params: LoadRecentPostsRepository.Params): Promise<LoadRecentPostsRepository.Result> {
        return [];
    }

    async loadByAuthor(params: LoadPostsByAuthorRepository.Params): Promise<LoadPostsByAuthorRepository.Result> {
        return [];
    }
}
