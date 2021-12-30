import { DbLoadProfile } from "@/data/usecases/db";
import { LoadProfile } from "@/domain/usecases";
import { ProfileMongoRepository } from "@/infra/db";

export const makeLoadProfile = (): LoadProfile => {
    const loadProfileRepository = new ProfileMongoRepository();
    const dbLoadProfile = new DbLoadProfile(loadProfileRepository);
    return dbLoadProfile;
};
