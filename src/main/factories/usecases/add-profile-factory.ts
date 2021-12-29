import { DbAddProfile } from "@/data/usecases/db";
import { AddProfile } from "@/domain/usecases";
import { ProfileMongoRepository } from "@/infra/db";

export const makeAddProfile = (): AddProfile => {
    const addProfileRepository = new ProfileMongoRepository();
    const dbAddProfile = new DbAddProfile(addProfileRepository);
    return dbAddProfile;
};
