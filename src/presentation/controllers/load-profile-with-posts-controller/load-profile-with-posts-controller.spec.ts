import { PostModel } from "@/domain/models";
import { CountPostLikes, CountProfileLikes, LoadPostsByAuthor, LoadProfile } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";
import { mockPostModel, mockProfileModel } from "@/tests/domain/mocks";

class LoadProfileWithPostsController implements Controller {
    constructor(
        private readonly loadProfile: LoadProfile,
        private readonly loadPostsByAuthor: LoadPostsByAuthor,
        private readonly countProfileLikes: CountProfileLikes,
        private readonly countPostLikes: CountPostLikes
    ) {}

    async handle(request: any): Promise<HttpResponse> {
        const profile = await this.loadProfile.perform({ profileId: request.profileId });
        if (!profile) return httpResponse.badRequest([new CustomParamError(`Profile with id ${request.profileId} not found.`)]);

        const profileLikesCount = await this.countProfileLikes.perform({ profileId: request.profileId });

        const posts = await this.loadPostsByAuthor.perform({ authorId: request.profileId });
        const postsWithLikes: Array<PostModel & { likesCount: number }> = await Promise.all(
            posts.map(async (post) => {
                const postLikesCount = await this.countPostLikes.perform({ postId: post.id });
                return { ...post, likesCount: postLikesCount };
            })
        );
        return httpResponse.ok({ ...profile, likesCount: profileLikesCount, posts: postsWithLikes });
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
    it("should return badRequest for non-existing profile.", async () => {
        const { sut } = makeSut();
        const controllerResponse = await sut.handle({ profileId: "any_prof_id" });
        expect(controllerResponse).toEqual(httpResponse.badRequest([new CustomParamError(`Profile with id any_prof_id not found.`)]));
    });

    it("should return ok for existing profile.", async () => {
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
});
