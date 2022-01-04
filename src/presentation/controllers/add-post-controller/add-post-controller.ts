import { PostModelWithLikes } from "@/domain/models";
import { AddPost, LoadProfile } from "@/domain/usecases";
import { InvalidParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class AddPostController implements Controller {
    constructor(private readonly loadProfile: LoadProfile, private readonly addPost: AddPost) {}

    async handle(request: AddPostController.Request): Promise<AddPostController.Result> {
        try {
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
        } catch (err) {
            return httpResponse.serverError(err as Error);
        }
    }
}

export namespace AddPostController {
    export type Request = { authorId: string; contentDescription: string };
    export type Result = HttpResponse<PostModelWithLikes>;
}
