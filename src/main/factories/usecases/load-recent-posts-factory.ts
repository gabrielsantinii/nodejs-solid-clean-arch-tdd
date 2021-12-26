import { DbLoadRecentPosts } from "@/data/usecases/db";
import { LoadRecentPosts } from "@/domain/usecases";
import { PostMongoRepository } from "@/infra/db";

export const makeLoadRecentPosts = (): LoadRecentPosts => {
    const postMongoRepository = new PostMongoRepository()
    return new DbLoadRecentPosts(postMongoRepository)
}