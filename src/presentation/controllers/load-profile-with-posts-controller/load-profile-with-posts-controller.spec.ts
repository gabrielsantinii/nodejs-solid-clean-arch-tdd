import { LoadProfile } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockProfileModel } from "@/tests/domain/mocks";

class LoadProfileWithPostsController implements Controller {
    constructor(private readonly loadProfile: LoadProfile) {}

    async handle(request: any): Promise<HttpResponse> {
        const profile = await this.loadProfile.perform({ profileId: request.profileId });
        if (!profile) return httpResponse.badRequest([new CustomParamError(`Profile with id ${request.profileId} not found.`)]);

        return httpResponse.ok(profile);
    }
}

class LoadProfileSpy implements LoadProfile {
    result: LoadProfile.Result = undefined;
    async perform(params: LoadProfile.Params): Promise<LoadProfile.Result> {
        return this.result;
    }
}

type SutType = {
    sut: LoadProfileWithPostsController;
    loadProfileSpy: LoadProfileSpy;
};

const makeSut = (): SutType => {
    const loadProfileSpy = new LoadProfileSpy();
    const sut = new LoadProfileWithPostsController(loadProfileSpy);
    return { sut, loadProfileSpy };
};

describe("load-profile-with-posts-controller.spec usecase", () => {
    it("should return badRequest for non-existing profile.", async () => {
        const { sut } = makeSut();
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError(`Profile with id any_prof_id not found.`)]));
    });

    it("should return ok for existing profile.", async () => {
        const { sut, loadProfileSpy } = makeSut();
        const mockProfile = mockProfileModel();
        loadProfileSpy.result = mockProfile;
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });

        expect(controllerResponse).toEqual(httpResponse.ok(mockProfile));
    });
});
