import { LoadRecentPostsRepository } from "@/data/protocols/db";
import { LoadRecentPosts } from "@/domain/usecases";

export class DbLoadRecentPosts implements LoadRecentPosts {
    constructor(private readonly loadRecentPostsRepository: LoadRecentPostsRepository) {}

    async perform(params: LoadRecentPosts.Params): Promise<LoadRecentPosts.Result> {
        return this.loadRecentPostsRepository.loadRecentPosts({ authorsIds: params.authorsIds });
    }
}
