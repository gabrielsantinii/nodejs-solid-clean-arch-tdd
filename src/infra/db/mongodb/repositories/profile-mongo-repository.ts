import mongoose from "mongoose";
import { ProfileModel } from "@/domain/models";
import {
    AddProfileRepository,
    CheckProfileByEmailRepository,
    CheckProfileByUsernameRepository,
    LoadProfileRepository,
} from "@/data/protocols/db";
import { MongoHelper } from "@/infra/db/mongodb/helpers";

export class ProfileMongoRepository
    implements LoadProfileRepository, AddProfileRepository, CheckProfileByUsernameRepository, CheckProfileByEmailRepository
{
    private readonly collection: mongoose.Model<ProfileModel>;
    constructor() {
        this.collection = MongoHelper.getCollection("profiles");
    }
    async loadProfile({ profileId }: LoadProfileRepository.Params): Promise<LoadProfileRepository.Result> {
        const profileDoc = await this.collection.findById(profileId);
        return profileDoc ? (profileDoc.toJSON() as any) : undefined;
    }

    async add(params: AddProfileRepository.Params): Promise<AddProfileRepository.Result> {
        const createdProfile = new this.collection({ ...params, ...this.generateDefaultValues() });
        await createdProfile.save();
        return createdProfile.toJSON() as any;
    }

    async checkByUsername(params: CheckProfileByUsernameRepository.Params): Promise<CheckProfileByUsernameRepository.Result> {
        return this.collection.findOne(params) as any;
    }

    async checkByEmail(params: CheckProfileByEmailRepository.Params): Promise<CheckProfileByEmailRepository.Result> {
        return this.collection.findOne(params) as any;
    }

    private generateDefaultValues(): Partial<ProfileModel> {
        return {
            avatarUrl: "",
            backgroundUrl: "",
            createdAt: new Date(),
        };
    }
}
