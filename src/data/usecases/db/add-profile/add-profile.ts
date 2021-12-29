import { AddProfileRepository } from "@/data/protocols/db";
import { AddProfile } from "@/domain/usecases";

export class DbAddProfile implements AddProfile {
    constructor(private readonly addProfileRepository: AddProfileRepository) {}

    async perform(params: AddProfile.Params): Promise<AddProfile.Result> {
        const createdProfile = await this.addProfileRepository.add(params);
        this.verifyAndThrowForInvalidId(createdProfile);
        return createdProfile;
    }

    private verifyAndThrowForInvalidId(profileResult: AddProfile.Result): void {
        if (!profileResult.id) throw new Error("Could not save the profile on database.");
    }
}