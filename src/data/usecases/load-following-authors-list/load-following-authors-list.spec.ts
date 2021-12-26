import { LoadFollowingAuthorsList } from "@/domain/usecases";

class LoadFollowingAuthorsListRepository {
    async loadFollowingAuthors(params: LoadFollowingAuthorsList.Params): Promise<LoadFollowingAuthorsList.Result> {
        return ["any_id", "any_name"];
    }
}

class DbLoadFollowingAuthorsList implements LoadFollowingAuthorsList {
    constructor(private readonly loadFollowingAuthorsListRepository: LoadFollowingAuthorsListRepository) {}

    async perform(params: LoadFollowingAuthorsList.Params): Promise<LoadFollowingAuthorsList.Result> {
        return this.loadFollowingAuthorsListRepository.loadFollowingAuthors({ followedBy: params.followedBy });
    }
}

describe("load-following-authors-list.spec usecase", () => {
    it("should return a list with following authors.", async () => {
        const loadFollowingAuthorsListRepository = new LoadFollowingAuthorsListRepository()
        const sut = new DbLoadFollowingAuthorsList(loadFollowingAuthorsListRepository);
        const followingAuthors = await sut.perform({ followedBy: "any_profile_id" });
        expect(Array.isArray(followingAuthors)).toBe(true);
        expect(followingAuthors.some((f) => typeof f !== "string")).toBe(false);
    });
});
