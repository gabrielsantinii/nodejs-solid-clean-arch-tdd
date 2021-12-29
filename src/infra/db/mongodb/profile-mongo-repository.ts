import { AddProfileRepository, LoadProfileRepository } from "@/data/protocols/db";

export class ProfileMongoRepository implements LoadProfileRepository, AddProfileRepository {
    async loadProfile({ profileId }: LoadProfileRepository.Params): Promise<LoadProfileRepository.Result> {
        return undefined;
    }

    async add(params: AddProfileRepository.Params): Promise<AddProfileRepository.Result> {
        return;
    }
}
