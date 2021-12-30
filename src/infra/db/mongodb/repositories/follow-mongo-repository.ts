import mongoose from "mongoose";
import { MongoHelper } from "@/infra/db/mongodb/helpers";
import { LoadFollowingAuthorsListRepository } from "@/data/protocols/db";
import { FollowModel } from "@/domain/models";

export class FollowMongoRepository implements LoadFollowingAuthorsListRepository {
    private readonly collection: mongoose.Model<FollowModel>;
    constructor() {
        this.collection = MongoHelper.getCollection("follows");
    }

    async loadFollowingAuthors(params: LoadFollowingAuthorsListRepository.Params): Promise<LoadFollowingAuthorsListRepository.Result> {
        const follows = await this.collection.find({ followingId: params.followingId });
        return follows.map((f) => f.toJSON().followedId);
    }
}
