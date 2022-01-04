import { PostModelWithLikes } from "@/domain/models";
import { LoadProfile } from "@/domain/usecases";
import { InvalidParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockProfileModel } from "@/tests/domain/mocks";

class LoadProfileSpy implements LoadProfile {
    result: LoadProfile.Result = mockProfileModel();
    async perform(params: LoadProfile.Params): Promise<LoadProfile.Result> {
        return this.result;
    }
}

class AddPostController implements Controller {
    constructor(private readonly loadProfile: LoadProfile) {}

    async handle(request: { authorId: string }): Promise<HttpResponse<PostModelWithLikes>> {
        const authorProfile = await this.loadProfile.perform({ profileId: request.authorId });
        if (!authorProfile) return httpResponse.badRequest([new InvalidParamError("authorId")]);

        return httpResponse.ok({});
    }
}

type SutType = {
    loadProfileSpy: LoadProfileSpy;
    sut: AddPostController;
};

const makeSut = (): SutType => {
    const loadProfileSpy = new LoadProfileSpy();
    const sut = new AddPostController(loadProfileSpy);
    return { sut, loadProfileSpy };
};

describe("add-post-controller.spec usecase", () => {
    it("should return ok 200 for existing authorId.", async () => {
        const { sut } = makeSut();
        const controllerResponse = await sut.handle({ authorId: "any_author_id" });
        expect(controllerResponse).toEqual(httpResponse.ok({}));
    });

    it("should return bad request 400 for non-existing authorId.", async () => {
        const { sut, loadProfileSpy } = makeSut();
        loadProfileSpy.result = undefined;
        const controllerResponse = await sut.handle({ authorId: "any_author_id" });
        expect(controllerResponse).toEqual(httpResponse.badRequest([new InvalidParamError("authorId")]));
    });
});
