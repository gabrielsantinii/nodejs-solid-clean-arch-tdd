import { LoadRecentPosts } from "@/domain/usecases";
import { Controller, HttpResponse } from "@/presentation/protocols";

class LoadRecentPostsSpy implements LoadRecentPosts {
    async perform(params: LoadRecentPosts.Params): Promise<LoadRecentPosts.Result> {
        return [];
    }
}

class LoadRecentPostsController implements Controller {
    constructor(private readonly loadRecentPosts: LoadRecentPosts) {}

    async handle(request: { followedBy: string }): Promise<HttpResponse> {
        const recentPosts = await this.loadRecentPosts.perform({ authorsIds: [""], limit: 20 });
        return { body: { posts: recentPosts }, statusCode: 200 };
    }
}

describe("load-recent-posts-controller.spec usecase", () => {
    it("should return a successful status response.", async () => {
        const loadRecentPostsSpy = new LoadRecentPostsSpy();
        const sut = new LoadRecentPostsController(loadRecentPostsSpy);
        const recentPosts = await sut.handle({ followedBy: "any_profile_id" });
        expect(recentPosts.statusCode).toBe(200);
    });
});
