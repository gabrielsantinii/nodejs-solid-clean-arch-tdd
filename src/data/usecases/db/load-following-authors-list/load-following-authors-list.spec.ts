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

const hasDuplicates = (list: Array<any>): boolean => {
    return list.some(element => list.filter(existingElement => element === existingElement).length > 1)
}

describe("load-following-authors-list.spec usecase", () => {
    it("should return a list with id of following authors.", async () => {
        const { sut } = makeSut();
        const followingAuthors = await sut.perform({ followingId: "any_profile_id" });
        expect(Array.isArray(followingAuthors)).toBe(true);
        expect(followingAuthors.some((f) => typeof f !== "string")).toBe(false);
        expect(hasDuplicates(followingAuthors)).toBe(false)
    });
});
