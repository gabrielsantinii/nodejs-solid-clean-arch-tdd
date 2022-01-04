import { PostModelWithLikes } from "@/domain/models";
import { AddPost, LoadProfile } from "@/domain/usecases";
import { InvalidParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockPostModel, mockProfileModel } from "@/tests/domain/mocks";

const mockAddPostRequest = (): AddPostController.Request => ({ authorId: "any_authorId", contentDescription: "any_desc" });

class LoadProfileSpy implements LoadProfile {
    result: LoadProfile.Result = undefined;
    async perform(params: LoadProfile.Params): Promise<LoadProfile.Result> {
        return this.result;
    }
}

class AddPostSpy implements AddPost {
    result: AddPost.Result = undefined;
    async perform(params: AddPost.Params): Promise<AddPost.Result> {
        return this.result;
    }
}

class AddPostController implements Controller {
    constructor(private readonly loadProfile: LoadProfile, private readonly addPost: AddPost) {}

    async handle(request: AddPostController.Request): Promise<AddPostController.Result> {
        const authorProfile = await this.loadProfile.perform({ profileId: request.authorId });
        if (!authorProfile) return httpResponse.badRequest([new InvalidParamError("authorId")]);
        const addedPost = await this.addPost.perform({
            contentDescription: request.contentDescription,
            postedBy: {
                avatarUrl: authorProfile.avatarUrl,
                id: authorProfile.id,
                name: authorProfile.name,
                username: authorProfile.username,
            },
        });
        const addedPostWithLikes: PostModelWithLikes = { ...addedPost, likesCount: 0 };
        return httpResponse.ok(addedPostWithLikes);
    }
}

namespace AddPostController {
    export type Request = { authorId: string; contentDescription: string };
    export type Result = HttpResponse<PostModelWithLikes>;
}

type SutType = {
    loadProfileSpy: LoadProfileSpy;
    sut: AddPostController;
    addPostSpy: AddPostSpy;
};

const makeSut = (): SutType => {
    const loadProfileSpy = new LoadProfileSpy();
    const addPostSpy = new AddPostSpy();
    const sut = new AddPostController(loadProfileSpy, addPostSpy);
    return { sut, loadProfileSpy, addPostSpy };
};

describe("add-post-controller.spec usecase", () => {
    it("should return ok 200 for existing authorId.", async () => {
        const { sut, addPostSpy, loadProfileSpy } = makeSut();
        const mockAddPostResult = mockPostModel();
        addPostSpy.result = mockAddPostResult;
        loadProfileSpy.result = mockProfileModel();
        const controllerResponse = await sut.handle(mockAddPostRequest());
        expect(controllerResponse).toEqual(httpResponse.ok({ ...mockAddPostResult, likesCount: 0 }));
    });

    it("should return bad request 400 for non-existing authorId.", async () => {
        const { sut, loadProfileSpy } = makeSut();
        loadProfileSpy.result = undefined;
        const controllerResponse = await sut.handle(mockAddPostRequest());
        expect(controllerResponse).toEqual(httpResponse.badRequest([new InvalidParamError("authorId")]));
    });
});
