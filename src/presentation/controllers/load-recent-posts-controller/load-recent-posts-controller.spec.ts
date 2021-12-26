import { LoadFollowingAuthorsList, LoadRecentPosts } from "@/domain/usecases";
import { noContent, ok } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockPostModel } from "@/tests/domain/mocks";

class LoadFollowingAuthorsListSpy implements LoadFollowingAuthorsList {
    followedBy = "";
    result = ["any_author_id", "any_author_id2", "any_author_id3"];
    async perform(params: LoadFollowingAuthorsList.Params): Promise<LoadFollowingAuthorsList.Result> {
        this.followedBy = params.followedBy;
        return this.result;
    }
}

class LoadRecentPostsSpy implements LoadRecentPosts {
    result = [mockPostModel(), mockPostModel(), mockPostModel()];
    authorsIds: string[] = [];
    limit = 0;

    async perform(params: LoadRecentPosts.Params): Promise<LoadRecentPosts.Result> {
        this.authorsIds = params.authorsIds;
        this.limit = params.limit;
        return this.result;
    }
}

class LoadRecentPostsController implements Controller {
    constructor(private readonly loadFollowingAuthorsList: LoadFollowingAuthorsList, private readonly loadRecentPosts: LoadRecentPosts) {}

    async handle(request: { followedBy: string }): Promise<HttpResponse> {
        const followingAuthorsList = await this.loadFollowingAuthorsList.perform({ followedBy: request.followedBy });
        const recentPosts = await this.loadRecentPosts.perform({ authorsIds: followingAuthorsList, limit: 20 });
        if (!recentPosts.length) return noContent();

        return ok(recentPosts);
    }
}



describe("load-recent-posts-controller.spec usecase", () => {
    it("should return a successful status response.", async () => {
        const loadFollowingAuthorsListSpy = new LoadFollowingAuthorsListSpy();
        const loadRecentPostsSpy = new LoadRecentPostsSpy();
        const sut = new LoadRecentPostsController(loadFollowingAuthorsListSpy, loadRecentPostsSpy);
        const recentPosts = await sut.handle({ followedBy: "any_profile_id" });
        expect(recentPosts.statusCode).toBe(200);
    });
});
