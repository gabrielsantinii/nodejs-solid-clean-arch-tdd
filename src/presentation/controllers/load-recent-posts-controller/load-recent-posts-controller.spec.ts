import { LoadFollowingAuthorsList, LoadRecentPosts } from "@/domain/usecases";
import { Controller, HttpResponse } from "@/presentation/protocols";

class LoadFollowingAuthorsListSpy implements LoadFollowingAuthorsList {
    async perform(params: LoadFollowingAuthorsList.Params): Promise<LoadFollowingAuthorsList.Result> {
        return [];
    }
}

class LoadRecentPostsSpy implements LoadRecentPosts {
    async perform(params: LoadRecentPosts.Params): Promise<LoadRecentPosts.Result> {
        return [];
    }
}

class LoadRecentPostsController implements Controller {
    constructor(private readonly loadFollowingAuthorsList: LoadFollowingAuthorsList, private readonly loadRecentPosts: LoadRecentPosts) {}

    async handle(request: { followedBy: string }): Promise<HttpResponse> {
        const followingAuthorsList = await this.loadFollowingAuthorsList.perform({ followedBy: request.followedBy });
        const recentPosts = await this.loadRecentPosts.perform({ authorsIds: followingAuthorsList, limit: 20 });
        return { body: { posts: recentPosts }, statusCode: 200 };
    }
}

describe("load-recent-posts-controller.spec usecase", () => {
    it("should return a successful status response.", async () => {
        const loadFollowingAuthorsListSpy = new LoadFollowingAuthorsListSpy();
        const loadRecentPostsSpy = new LoadRecentPostsSpy();
        const sut = new LoadRecentPostsController(loadFollowingAuthorsListSpy, loadRecentPostsSpy);
        const recentPosts = await sut.handle({ followedBy: "any_profile_id" });
        expect(recentPosts.statusCode).toBe(200);
        expect(recentPosts.body).toHaveProperty('posts')
    });
});
