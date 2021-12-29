import { DbCheckProfileByEmail } from "@/data/usecases/db";
import { CheckProfileByEmail } from "@/domain/usecases";
import { ProfileMongoRepository } from "@/infra/db";

export const makeCheckProfileByEmail = (): CheckProfileByEmail => {
    const checkProfileByEmailRepository = new ProfileMongoRepository();
    const dbCheckProfileByEmail = new DbCheckProfileByEmail(checkProfileByEmailRepository);
    return dbCheckProfileByEmail;
};
