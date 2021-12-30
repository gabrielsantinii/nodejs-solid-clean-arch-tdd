import { LoadPostsByAuthor, LoadProfile } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockPostModel, mockProfileModel } from "@/tests/domain/mocks";

class LoadProfileWithPostsController implements Controller {
    constructor(private readonly loadProfile: LoadProfile, private readonly loadPostsByAuthor: LoadPostsByAuthor) {}

    async handle(request: any): Promise<HttpResponse> {
        const profile = await this.loadProfile.perform({ profileId: request.profileId });
        if (!profile) return httpResponse.badRequest([new CustomParamError(`Profile with id ${request.profileId} not found.`)]);

        const posts = await this.loadPostsByAuthor.perform({ authorId: request.profileId });
        return httpResponse.ok({ ...profile, posts });
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

type SutType = {
    sut: LoadProfileWithPostsController;
    loadProfileSpy: LoadProfileSpy;
    loadPostsByAuthorSpy: LoadPostsByAuthorSpy;
};

const makeSut = (): SutType => {
    const loadProfileSpy = new LoadProfileSpy();
    const loadPostsByAuthorSpy = new LoadPostsByAuthorSpy();
    const sut = new LoadProfileWithPostsController(loadProfileSpy, loadPostsByAuthorSpy);
    return { sut, loadProfileSpy, loadPostsByAuthorSpy };
};

describe("load-profile-with-posts-controller.spec usecase", () => {
    it("should return badRequest for non-existing profile.", async () => {
        const { sut } = makeSut();
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError(`Profile with id any_prof_id not found.`)]));
    });

    it("should return ok for existing profile.", async () => {
        const { sut, loadProfileSpy, loadPostsByAuthorSpy } = makeSut();
        const mockProfile = mockProfileModel();
        const mockPost = mockPostModel();
        loadProfileSpy.result = mockProfile;
        loadPostsByAuthorSpy.result = [mockPost]
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });

        expect(controllerResponse).toEqual(httpResponse.ok({ ...mockProfile, posts: [mockPost] }));
    });
});
