import { LoadFollowingAuthorsListRepository } from "@/data/protocols/db";
import { LoadFollowingAuthorsList } from "@/domain/usecases";
import { DbLoadFollowingAuthorsList } from "@/data/usecases/db";

class LoadFollowingAuthorsListRepositorySpy implements LoadFollowingAuthorsListRepository {
    result: LoadFollowingAuthorsListRepository.Result = ["any-author-id", "any-second-author-id"];
    async loadFollowingAuthors(params: LoadFollowingAuthorsList.Params): Promise<LoadFollowingAuthorsList.Result> {
        return this.result;
    }
}

type SutType = {
    sut: LoadFollowingAuthorsList;
    loadFollowingAuthorsListRepository: LoadFollowingAuthorsListRepository;
};
const makeSut = (): SutType => {
    const loadFollowingAuthorsListRepository = new LoadFollowingAuthorsListRepositorySpy();
    const sut = new DbLoadFollowingAuthorsList(loadFollowingAuthorsListRepository);
    return { loadFollowingAuthorsListRepository, sut };
};

describe("load-following-authors-list.spec usecase", () => {
    it("should return a list with id of following authors.", async () => {
        const { sut } = makeSut();
        const followingAuthors = await sut.perform({ followedBy: "any_profile_id" });
        expect(Array.isArray(followingAuthors)).toBe(true);
        expect(followingAuthors.some((f) => typeof f !== "string")).toBe(false);
    });
});
