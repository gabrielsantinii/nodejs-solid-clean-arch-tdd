import { DbCheckProfileByUsername } from "@/data/usecases/db";
import { CheckProfileByUsername } from "@/domain/usecases";
import { ProfileMongoRepository } from "@/infra/db";

export const makeCheckProfileByUsername = (): CheckProfileByUsername => {
    const checkProfileByUsernameRepository = new ProfileMongoRepository();
    const dbCheckProfileByUsername = new DbCheckProfileByUsername(checkProfileByUsernameRepository);
    return dbCheckProfileByUsername;
};
