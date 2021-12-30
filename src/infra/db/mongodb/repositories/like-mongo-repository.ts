import mongoose from "mongoose";
import { CountPostLikesRepository, CountProfileLikesRepository } from "@/data/protocols/db";
import { MongoHelper } from "@/infra/db/mongodb/helpers";
import { LikeModel } from "@/domain/models";

export class LikeMongoRepository implements CountPostLikesRepository, CountProfileLikesRepository {
    private readonly collection: mongoose.Model<LikeModel>;
    constructor() {
        this.collection = MongoHelper.getCollection("likes");
    }
    async countLikeByPostId(params: CountPostLikesRepository.Params): Promise<CountPostLikesRepository.Result> {
        return this.collection.count({ postId: params.postId });
    }

    async countByProfileId(params: CountProfileLikesRepository.Params): Promise<CountProfileLikesRepository.Result> {
        return this.collection.count({ postedBy: params.profileId });
    }
}
