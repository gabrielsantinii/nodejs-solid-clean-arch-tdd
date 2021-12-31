import mongoose from "mongoose";
import {
    AddProfileRepository,
    CheckProfileByEmailRepository,
    CheckProfileByUsernameRepository,
    LoadProfileRepository,
} from "@/data/protocols/db";
import { MongoHelper } from "@/infra/db/mongodb/helpers";
import { ProfileModel } from "@/domain/models";

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
        const createdProfile = new this.collection(params);
        await createdProfile.save();
        return createdProfile.toJSON() as any;
    }

    async checkByUsername(params: CheckProfileByUsernameRepository.Params): Promise<CheckProfileByUsernameRepository.Result> {
        return this.collection.findOne(params) as any;
    }

    async checkByEmail(params: CheckProfileByEmailRepository.Params): Promise<CheckProfileByEmailRepository.Result> {
        return this.collection.findOne(params) as any;
    }
}
