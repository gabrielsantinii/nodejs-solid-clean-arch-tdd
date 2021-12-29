import { DbLoadFollowingAuthorsList } from "@/data/usecases/db";
import { LoadFollowingAuthorsList } from "@/domain/usecases";
import { FollowMongoRepository } from "@/infra/db";

export const makeLoadFollowingAuthorsList = (): LoadFollowingAuthorsList => {
    const followMongoRepository = new FollowMongoRepository()
    return new DbLoadFollowingAuthorsList(followMongoRepository)
}