import { DbAddPost } from "@/data/usecases/db";
import { AddPost } from "@/domain/usecases";
import { PostMongoRepository } from "@/infra/db";

export const makeAddPost = (): AddPost => {
    const postMongoRepository = new PostMongoRepository()
    return new DbAddPost(postMongoRepository)
}