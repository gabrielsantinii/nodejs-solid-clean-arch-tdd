import { PostModel, PostModelWithLikes, ProfileModelWithLikes } from "@/domain/models";
import { CountPostLikes, CountProfileLikes, LoadPostsByAuthor, LoadProfile } from "@/domain/usecases";
import { CustomParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class LoadProfileController implements Controller {
    constructor(
        private readonly loadProfile: LoadProfile,
        private readonly loadPostsByAuthor: LoadPostsByAuthor,
        private readonly countProfileLikes: CountProfileLikes,
        private readonly countPostLikes: CountPostLikes
    ) {}

    async handle(request: LoadProfileWithPostsController.Request): Promise<LoadProfileWithPostsController.Result> {
        try {
            const profile = await this.loadProfile.perform({ profileId: request.profileId });
            if (!profile) return httpResponse.notFound([new CustomParamError(`Profile with id ${request.profileId} not found.`)]);

            const profileLikesCount = await this.countProfileLikes.perform({ profileId: request.profileId });

            if (request.loadPosts !== "true") return httpResponse.ok({ ...profile, likesCount: profileLikesCount });

            const posts = await this.loadPostsByAuthor.perform({ authorId: request.profileId });
            const postsWithLikes: Array<PostModel & { likesCount: number }> = await Promise.all(
                posts.map(async (post) => {
                    const postLikesCount = await this.countPostLikes.perform({ postId: post.id });
                    return { ...post, likesCount: postLikesCount };
                })
            );
            return httpResponse.ok({ ...profile, likesCount: profileLikesCount, posts: postsWithLikes });
        } catch (err) {
            return httpResponse.serverError(err as Error);
        }
    }
}

export namespace LoadProfileWithPostsController {
    export type Request = { profileId: string; loadPosts?: string };
    export type Result = HttpResponse<ProfileModelWithLikes | (ProfileModelWithLikes & { posts: PostModelWithLikes })>;
}
