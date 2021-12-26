import { LoadRecentPostsRepository } from "@/data/protocols/db";
import { mockPostModel } from "@/tests/domain/mocks";

export class PostMongoRepository implements LoadRecentPostsRepository {
    async loadRecentPosts(params: LoadRecentPostsRepository.Params): Promise<LoadRecentPostsRepository.Result> {
        return [mockPostModel(), mockPostModel()];
    }
}
