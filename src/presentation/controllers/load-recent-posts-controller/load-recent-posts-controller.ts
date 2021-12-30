import { LoadFollowingAuthorsList, LoadRecentPosts } from "@/domain/usecases";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class LoadRecentPostsController implements Controller {
    constructor(private readonly loadFollowingAuthorsList: LoadFollowingAuthorsList, private readonly loadRecentPosts: LoadRecentPosts) {}

    async handle(request: LoadRecentPostsController.Request): Promise<HttpResponse> {
        try {
            const followingAuthorsList = await this.loadFollowingAuthorsList.perform({ followingId: request.followingId });
            const recentPosts = await this.loadRecentPosts.perform({ authorsIds: followingAuthorsList, limit: 20 });
            if (!recentPosts.length) return httpResponse.noContent();

            return httpResponse.ok(recentPosts);
        } catch (error) {
            return httpResponse.serverError(error as Error);
        }
    }
}

export namespace LoadRecentPostsController {
    export type Request = {
        followingId: string;
    };
}
