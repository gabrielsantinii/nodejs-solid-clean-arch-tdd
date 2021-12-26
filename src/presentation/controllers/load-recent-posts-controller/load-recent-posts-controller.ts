import { LoadFollowingAuthorsList, LoadRecentPosts } from "@/domain/usecases";
import { noContent, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class LoadRecentPostsController implements Controller {
    constructor(private readonly loadFollowingAuthorsList: LoadFollowingAuthorsList, private readonly loadRecentPosts: LoadRecentPosts) {}

    async handle(request: LoadRecentPostsController.Request): Promise<HttpResponse> {
        try {
            const followingAuthorsList = await this.loadFollowingAuthorsList.perform({ followedBy: request.followedBy });
            const recentPosts = await this.loadRecentPosts.perform({ authorsIds: followingAuthorsList, limit: 20 });
            if (!recentPosts.length) return noContent();

            return ok(recentPosts);
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace LoadRecentPostsController {
    export type Request = {
        followedBy: string;
    };
}