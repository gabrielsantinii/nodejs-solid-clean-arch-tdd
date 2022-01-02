import mongoose from "mongoose";
import { AddPostRepository, LoadPostsByAuthorRepository, LoadRecentPostsRepository } from "@/data/protocols/db";
import { MongoHelper } from "@/infra/db/mongodb/helpers";
import { PostModel } from "@/domain/models";

export class PostMongoRepository implements LoadRecentPostsRepository, LoadPostsByAuthorRepository, AddPostRepository {
    private readonly collection: mongoose.Model<PostModel>;
    constructor() {
        this.collection = MongoHelper.getCollection("posts");
    }

    async add(params: AddPostRepository.Params): Promise<AddPostRepository.Result> {
        const createdPost = new this.collection({ ...params, postedAt: new Date() });
        await createdPost.save();
        return createdPost.toJSON() as any;
    }

    async loadWithLimit(params: LoadRecentPostsRepository.Params): Promise<LoadRecentPostsRepository.Result> {
        const posts = await this.collection.find({ authorId: { $in: params.authorsIds } }).limit(params.limit);
        return posts.map((p) => p.toJSON()) as any;
    }

    async loadByAuthor(params: LoadPostsByAuthorRepository.Params): Promise<LoadPostsByAuthorRepository.Result> {
        const posts = await this.collection.find({ authorId: params.authorId });
        return posts.map((p) => p.toJSON()) as any;
    }
}
