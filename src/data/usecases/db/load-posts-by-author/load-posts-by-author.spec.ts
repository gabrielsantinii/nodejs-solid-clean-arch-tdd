import { LoadPostsByAuthorRepository } from "@/data/protocols/db";
import { LoadPostsByAuthor } from "@/domain/usecases";
import { mockPostModel } from "@/tests/domain/mocks";
import { DbLoadPostsByAuthor } from "@/data/usecases/db";

class LoadPostsByAuthorRepositorySpy implements LoadPostsByAuthorRepository {
    result: LoadPostsByAuthorRepository.Result = [];
    async loadByAuthor(params: LoadPostsByAuthorRepository.Params): Promise<LoadPostsByAuthorRepository.Result> {
        return this.result;
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

    it("should return a filled array of posts.", async () => {
        const { sut, loadPostsByAuthorRepositorySpy } = makeSut();
        loadPostsByAuthorRepositorySpy.result = [mockPostModel()];
        const posts = await sut.perform({ authorId: "any_author_id" });
        expect(posts.length).toBeGreaterThan(0);
    });
});
