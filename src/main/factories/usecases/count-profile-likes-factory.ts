import { DbCountProfileLikes } from "@/data/usecases/db";
import { CountProfileLikes } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";

export const makeCountProfileLikes = (): CountProfileLikes => {
    const countProfileLikesRepository = new LikeMongoRepository();
    const dbCountProfileLikes = new DbCountProfileLikes(countProfileLikesRepository);
    return dbCountProfileLikes;
};
