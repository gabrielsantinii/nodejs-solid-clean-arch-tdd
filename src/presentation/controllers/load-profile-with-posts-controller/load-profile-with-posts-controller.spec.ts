import { CountProfileLikes, LoadPostsByAuthor, LoadProfile } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockPostModel, mockProfileModel } from "@/tests/domain/mocks";

class LoadProfileWithPostsController implements Controller {
    constructor(
        private readonly loadProfile: LoadProfile,
        private readonly loadPostsByAuthor: LoadPostsByAuthor,
        private readonly countProfileLikes: CountProfileLikes
    ) {}

    async handle(request: any): Promise<HttpResponse> {
        const profile = await this.loadProfile.perform({ profileId: request.profileId });
        if (!profile) return httpResponse.badRequest([new CustomParamError(`Profile with id ${request.profileId} not found.`)]);

        const posts = await this.loadPostsByAuthor.perform({ authorId: request.profileId });
        const profileLikesCount = await this.countProfileLikes.perform({ profileId: request.profileId });
        return httpResponse.ok({ ...profile, posts, likesCount: profileLikesCount });
    }
}

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

type SutType = {
    sut: LoadProfileWithPostsController;
    loadProfileSpy: LoadProfileSpy;
    loadPostsByAuthorSpy: LoadPostsByAuthorSpy;
    countProfileLikesSpy: CountProfileLikesSpy;
};

const makeSut = (): SutType => {
    const loadProfileSpy = new LoadProfileSpy();
    const loadPostsByAuthorSpy = new LoadPostsByAuthorSpy();
    const countProfileLikesSpy = new CountProfileLikesSpy();
    const sut = new LoadProfileWithPostsController(loadProfileSpy, loadPostsByAuthorSpy, countProfileLikesSpy);
    return { sut, loadProfileSpy, loadPostsByAuthorSpy, countProfileLikesSpy };
};

describe("load-profile-with-posts-controller.spec usecase", () => {
    it("should return badRequest for non-existing profile.", async () => {
        const { sut } = makeSut();
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError(`Profile with id any_prof_id not found.`)]));
    });

    it("should return ok for existing profile.", async () => {
        const { sut, loadProfileSpy, loadPostsByAuthorSpy, countProfileLikesSpy } = makeSut();
        const mockProfile = mockProfileModel();
        const mockPost = mockPostModel();
        const mockProfileLikesCount = 10;
        loadProfileSpy.result = mockProfile;
        loadPostsByAuthorSpy.result = [mockPost];
        countProfileLikesSpy.result = mockProfileLikesCount;
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });

        expect(controllerResponse).toEqual(httpResponse.ok({ ...mockProfile, posts: [mockPost], likesCount: mockProfileLikesCount }));
    });
});
