import { LoadPostsByAuthor } from "@/domain/usecases";

class LoadPostsByAuthorRepositorySpy implements LoadPostsByAuthorRepository {
    result: LoadPostsByAuthorRepository.Result = [];
    async loadByAuthor(params: LoadPostsByAuthorRepository.Params): Promise<LoadPostsByAuthorRepository.Result> {
        return this.result;
    }
}

interface LoadPostsByAuthorRepository {
    loadByAuthor: (params: LoadPostsByAuthorRepository.Params) => Promise<LoadPostsByAuthorRepository.Result>;
}

namespace LoadPostsByAuthorRepository {
    export type Params = LoadPostsByAuthor.Params;
    export type Result = LoadPostsByAuthor.Result;
}

class DbLoadPostsByAuthor implements LoadPostsByAuthor {
    constructor(private readonly loadPostsByAuthorRepository: LoadPostsByAuthorRepository) {}

    async perform(params: LoadPostsByAuthor.Params): Promise<LoadPostsByAuthor.Result> {
        return this.loadPostsByAuthorRepository.loadByAuthor({ authorId: params.authorId });
    }
}

type SutType = {
    sut: LoadPostsByAuthor;
    loadPostsByAuthorRepositorySpy: LoadPostsByAuthorRepositorySpy;
};

const makeSut = (): SutType => {
    const loadPostsByAuthorRepositorySpy = new LoadPostsByAuthorRepositorySpy();
    const sut = new DbLoadPostsByAuthor(loadPostsByAuthorRepositorySpy);
    return { sut, loadPostsByAuthorRepositorySpy };
};

describe("load-posts-by-author.spec usecase", () => {
    it("should return an array of posts.", async () => {
        const { sut } = makeSut();
        const posts = await sut.perform({ authorId: "any_author_id" });
        expect(Array.isArray(posts)).toBe(true);
    });
});
