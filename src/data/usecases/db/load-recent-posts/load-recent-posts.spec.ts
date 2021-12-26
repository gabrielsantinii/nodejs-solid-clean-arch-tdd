import { PostModel } from "@/domain/models";
import { mockPostModel } from "@/tests/domain/mocks";

class LoadRecentPosts {
    async perform({ authorsIds }: { authorsIds: string[] }): Promise<PostModel[]> {
        return [{ ...mockPostModel(), ...mockPostModel() }];
    }
}

describe("load-recent-posts.spec usecase", () => {
    it("should return a list of posts.", async () => {
        const sut = new LoadRecentPosts();
        const recentPosts = await sut.perform({ authorsIds: ["any_id", "any_sec_id"] });
        expect(Array.isArray(recentPosts)).toBeTruthy();
    });
});
