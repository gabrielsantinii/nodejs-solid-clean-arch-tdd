import { Controller, HttpResponse } from "@/presentation/protocols";

class LoadRecentPostsController implements Controller {
    async handle(request: { followedBy: string }): Promise<HttpResponse> {
        return { body: { posts: [] }, statusCode: 200 };
    }
}

describe("load-recent-posts-controller.spec usecase", () => {
    it("should return a successful status response.", async () => {
        const sut = new LoadRecentPostsController();
        const recentPosts = await sut.handle({ followedBy: "any_profile_id" });
        expect(recentPosts.statusCode).toBe(200);
    });
});
