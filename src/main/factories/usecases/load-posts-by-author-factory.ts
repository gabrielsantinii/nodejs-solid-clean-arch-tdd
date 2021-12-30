import { DbLoadPostsByAuthor } from "@/data/usecases/db";
import { LoadPostsByAuthor } from "@/domain/usecases";
import { PostMongoRepository } from "@/infra/db";

export const makeLoadPostsByAuthor = (): LoadPostsByAuthor => {
    const loadPostsByAuthorRepository = new PostMongoRepository();
    const dbLoadPostsByAuthor = new DbLoadPostsByAuthor(loadPostsByAuthorRepository);
    return dbLoadPostsByAuthor;
};
