import { AddProfileRepository, CheckProfileByUsernameRepository, LoadProfileRepository } from "@/data/protocols/db";

export class ProfileMongoRepository implements LoadProfileRepository, AddProfileRepository, CheckProfileByUsernameRepository {
    async loadProfile({ profileId }: LoadProfileRepository.Params): Promise<LoadProfileRepository.Result> {
        return undefined;
    }

    async add(params: AddProfileRepository.Params): Promise<AddProfileRepository.Result> {
        return;
    }

    async checkByUsername(params: CheckProfileByUsernameRepository.Params): Promise<CheckProfileByUsernameRepository.Result> {
        return;
    }
}
