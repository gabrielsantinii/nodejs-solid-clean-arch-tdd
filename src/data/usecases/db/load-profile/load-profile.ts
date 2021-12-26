import { LoadProfile } from "@/domain/usecases";
import { LoadProfileRepository } from "@/data/protocols/db";

export class DbLoadProfile implements LoadProfile {
    constructor(private readonly loadProfileRepository: LoadProfileRepository) {}

    async perform({ profileId }: LoadProfile.Params): Promise<LoadProfile.Result> {
        return this.loadProfileRepository.loadProfile({ profileId });
    }
}
