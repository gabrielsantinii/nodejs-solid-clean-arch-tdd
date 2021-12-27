import { LoadProfileRepository } from "@/data/protocols/db";

export class ProfileMongoRepository implements LoadProfileRepository {
    async loadProfile({ profileId }: LoadProfileRepository.Params): Promise<LoadProfileRepository.Result> {
        return undefined;
    }
}
