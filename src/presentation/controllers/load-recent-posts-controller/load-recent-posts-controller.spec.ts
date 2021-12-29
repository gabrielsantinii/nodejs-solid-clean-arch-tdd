import { LoadFollowingAuthorsList, LoadRecentPosts } from "@/domain/usecases";
import { httpResponse } from "@/presentation/helpers";
import { mockPostModel, throwError } from "@/tests/domain/mocks";
import { LoadRecentPostsController } from "@/presentation/controllers";

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
    it("should return a successful status (200) for populated response", async () => {
        const { sut, loadRecentPostsSpy, loadFollowingAuthorsListSpy } = makeSut();
        const mockedRequest = mockRequest();
        const controllerResponse = await sut.handle(mockedRequest);

        expect(controllerResponse).toEqual(httpResponse.ok(loadRecentPostsSpy.result));

        // Ensure the props are being passed correctly
        expect(loadFollowingAuthorsListSpy.followedBy).toBe(mockedRequest.followedBy);
        expect(loadRecentPostsSpy.authorsIds).toBe(loadFollowingAuthorsListSpy.result);
    });

    it("should return noContent (204) when load-recent-posts are empty array", async () => {
        const { sut, loadRecentPostsSpy } = makeSut();
        loadRecentPostsSpy.result = [];
        const controllerResponse = await sut.handle(mockRequest());
        expect(controllerResponse).toEqual(httpResponse.noContent());
    });

    it("should return server error (500) when any method throws error", async () => {
        const { sut, loadRecentPostsSpy } = makeSut();
        jest.spyOn(loadRecentPostsSpy, "perform").mockImplementationOnce(throwError);
        const controllerResponse = await sut.handle(mockRequest());
        expect(controllerResponse).toEqual(httpResponse.serverError(new Error()));
    });
});
