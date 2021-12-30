import { CountPostLikes, CountProfileLikes, LoadPostsByAuthor, LoadProfile } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { mockPostModel, mockProfileModel, throwError } from "@/tests/domain/mocks";
import { LoadProfileWithPostsController } from "./load-profile-with-posts-controller";

class LoadProfileSpy implements LoadProfile {
    result: LoadProfile.Result = undefined;
    async perform(params: LoadProfile.Params): Promise<LoadProfile.Result> {
        return this.result;
    }
}

class LoadPostsByAuthorSpy implements LoadPostsByAuthor {
    result: LoadPostsByAuthor.Result = [];
    async perform(params: LoadPostsByAuthor.Params): Promise<LoadPostsByAuthor.Result> {
        return this.result;
    }
}

class CountProfileLikesSpy implements CountProfileLikes {
    result: CountProfileLikes.Result = 0;
    async perform(params: CountProfileLikes.Params): Promise<CountProfileLikes.Result> {
        return this.result;
    }
}

class CountPostLikesSpy implements CountPostLikes {
    result: CountPostLikes.Result = 0;
    async perform(params: CountPostLikes.Params): Promise<CountPostLikes.Result> {
        return this.result;
    }
}

type SutType = {
    sut: LoadProfileWithPostsController;
    loadProfileSpy: LoadProfileSpy;
    loadPostsByAuthorSpy: LoadPostsByAuthorSpy;
    countProfileLikesSpy: CountProfileLikesSpy;
    countPostLikesSpy: CountPostLikesSpy;
};

const makeSut = (): SutType => {
    const loadProfileSpy = new LoadProfileSpy();
    const loadPostsByAuthorSpy = new LoadPostsByAuthorSpy();
    const countProfileLikesSpy = new CountProfileLikesSpy();
    const countPostLikesSpy = new CountPostLikesSpy();
    const sut = new LoadProfileWithPostsController(loadProfileSpy, loadPostsByAuthorSpy, countProfileLikesSpy, countPostLikesSpy);
    return { sut, loadProfileSpy, loadPostsByAuthorSpy, countProfileLikesSpy, countPostLikesSpy };
};

describe("load-profile-with-posts-controller.spec usecase", () => {
    it("should return badRequest 400 for non-existing profile.", async () => {
        const { sut } = makeSut();
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError(`Profile with id any_prof_id not found.`)]));
    });

    it("should return ok 200 for existing profile.", async () => {
        const { sut, loadProfileSpy, loadPostsByAuthorSpy, countProfileLikesSpy, countPostLikesSpy } = makeSut();
        const mockProfile = mockProfileModel();
        const mockPost = mockPostModel();
        const mockProfileLikesCount = 10;
        const mockPostLikesCount = 20;
        loadProfileSpy.result = mockProfile;
        loadPostsByAuthorSpy.result = [mockPost];
        countProfileLikesSpy.result = mockProfileLikesCount;
        countPostLikesSpy.result = mockPostLikesCount;
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });

        expect(controllerResponse).toEqual(
            httpResponse.ok({
                ...mockProfile,
                likesCount: mockProfileLikesCount,
                posts: [mockPost].map((p) => ({ ...p, likesCount: mockPostLikesCount })),
            })
        );
    });

    it("should return server error 500 for internal throw exception", async () => {
        const { sut, countPostLikesSpy } = makeSut();
        jest.spyOn(countPostLikesSpy, "perform").mockImplementationOnce(throwError);
        const controllerResponse = await sut.handle({ profileId: "123" });
        expect(controllerResponse).toEqual(httpResponse.serverError(new Error()));
    });
});
