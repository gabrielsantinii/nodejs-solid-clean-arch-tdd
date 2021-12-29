import { LoadRecentPostsRepository } from "@/data/protocols/db";
import { LoadRecentPosts } from "@/domain/usecases";
import { DbLoadRecentPosts } from "@/data/usecases/db";
import { mockPostModel } from "@/tests/domain/mocks";

class LoadRecentPostsRepositorySpy implements LoadRecentPostsRepository {
    result: LoadRecentPostsRepository.Result = [mockPostModel(), mockPostModel()];
    async loadWithLimit(params: LoadRecentPosts.Params): Promise<LoadRecentPosts.Result> {
        return this.result;
    }
}

type SutType = {
    sut: LoadRecentPosts;
    loadRecentPostsRepositorySpy: LoadRecentPostsRepositorySpy;
};

const makeSut = (): SutType => {
    const loadRecentPostsRepositorySpy = new LoadRecentPostsRepositorySpy();
    const sut = new DbLoadRecentPosts(loadRecentPostsRepositorySpy);

    return { sut, loadRecentPostsRepositorySpy };
};

describe("load-recent-posts.spec usecase", () => {
    it("should return a list of posts.", async () => {
        const { sut } = makeSut();
        const recentPosts = await sut.perform({ authorsIds: ["any_id", "any_sec_id"], limit: 20 });
        expect(Array.isArray(recentPosts)).toBeTruthy();
        expect(recentPosts.length).toBeLessThanOrEqual(20);
    });
});
