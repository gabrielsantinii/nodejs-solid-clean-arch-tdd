import { LoadFollowingAuthorsListRepository } from "@/data/protocols/db";
import { LoadFollowingAuthorsList } from "@/domain/usecases";
import { FollowMongoRepository } from "@/infra/db";
import { DbLoadFollowingAuthorsList } from "./load-following-authors-list";

type SutType = {
    sut: LoadFollowingAuthorsList;
    loadFollowingAuthorsListRepository: LoadFollowingAuthorsListRepository;
};
const makeSut = (): SutType => {
    const loadFollowingAuthorsListRepository = new FollowMongoRepository();
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
