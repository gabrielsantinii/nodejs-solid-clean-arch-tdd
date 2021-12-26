import { LoadProfileRepository } from "@/data/protocols/db";
import { mockProfileModel } from "@/tests/domain/mocks/mock-profile";

export class ProfileMongoRepository implements LoadProfileRepository {
    async loadProfile({ profileId }: LoadProfileRepository.Params): Promise<LoadProfileRepository.Result> {
        if (profileId === "existant_id") return { ...mockProfileModel() };

        return undefined;
    }
}
