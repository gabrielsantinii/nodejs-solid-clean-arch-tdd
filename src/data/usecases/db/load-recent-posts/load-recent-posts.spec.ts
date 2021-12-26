import { LoadRecentPosts } from "@/domain/usecases";
import { mockPostModel } from "@/tests/domain/mocks";

class DbLoadRecentPosts implements LoadRecentPosts {
    async perform(params: LoadRecentPosts.Params): Promise<LoadRecentPosts.Result> {
        return [{ ...mockPostModel(), ...mockPostModel() }];
    }
}

describe("load-recent-posts.spec usecase", () => {
    it("should return a list of posts.", async () => {
        const sut = new DbLoadRecentPosts();
        const recentPosts = await sut.perform({ authorsIds: ["any_id", "any_sec_id"] });
        expect(Array.isArray(recentPosts)).toBeTruthy();
    });
});
