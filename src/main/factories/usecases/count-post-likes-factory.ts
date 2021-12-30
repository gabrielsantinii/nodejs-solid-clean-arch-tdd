import { DbCountPostLikes } from "@/data/usecases/db";
import { CountPostLikes } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";

export const makeCountPostLikes = (): CountPostLikes => {
    const countPostLikesRepository = new LikeMongoRepository();
    const dbCountPostLikes = new DbCountPostLikes(countPostLikesRepository);
    return dbCountPostLikes;
};
