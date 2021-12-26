import { LoadFollowingAuthorsList, LoadRecentPosts } from "@/domain/usecases";
import { noContent, ok } from "@/presentation/helpers";
import { mockPostModel } from "@/tests/domain/mocks";
import { LoadRecentPostsController } from "./load-recent-posts-controller";

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

const mockRequest = (): LoadRecentPostsController.Request => ({ followedBy: "any_profile_id" });

type SutType = {
    loadFollowingAuthorsListSpy: LoadFollowingAuthorsListSpy;
    loadRecentPostsSpy: LoadRecentPostsSpy;
    sut: LoadRecentPostsController;
};

const makeSut = (): SutType => {
    const loadFollowingAuthorsListSpy = new LoadFollowingAuthorsListSpy();
    const loadRecentPostsSpy = new LoadRecentPostsSpy();
    const sut = new LoadRecentPostsController(loadFollowingAuthorsListSpy, loadRecentPostsSpy);

    return { loadFollowingAuthorsListSpy, loadRecentPostsSpy, sut };
};

describe("load-recent-posts-controller.spec usecase", () => {
    it("should return a successful status response.", async () => {
        const { sut, loadRecentPostsSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(loadRecentPostsSpy.result));
    });

    it("should return noContent when load-recent-posts are empty array", async () => {
        const { sut, loadRecentPostsSpy } = makeSut();
        loadRecentPostsSpy.result = [];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(noContent());
    });
});
