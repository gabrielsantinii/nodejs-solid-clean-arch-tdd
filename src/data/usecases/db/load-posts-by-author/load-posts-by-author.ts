import { LoadPostsByAuthorRepository } from "@/data/protocols/db";
import { LoadPostsByAuthor } from "@/domain/usecases";

export class DbLoadPostsByAuthor implements LoadPostsByAuthor {
    constructor(private readonly loadPostsByAuthorRepository: LoadPostsByAuthorRepository) {}

    async perform(params: LoadPostsByAuthor.Params): Promise<LoadPostsByAuthor.Result> {
        return this.loadPostsByAuthorRepository.loadByAuthor({ authorId: params.authorId });
    }
}