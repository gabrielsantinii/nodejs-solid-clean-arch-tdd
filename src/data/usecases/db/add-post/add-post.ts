import { AddPostRepository } from "@/data/protocols/db";
import { AddPost } from "@/domain/usecases";

export class DbAddPost implements AddPost {
    constructor(private readonly addPostRepository: AddPostRepository) {}

    async perform(params: AddPost.Params): Promise<AddPost.Result> {
        const savedPost = await this.addPostRepository.add(params);
        if (!savedPost?.id) throw new Error("Could not add post");
        return savedPost;
    }
}