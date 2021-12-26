import { LoadRecentPostsRepository } from "@/data/protocols/db";
import { LoadRecentPosts } from "@/domain/usecases";
import { PostMongoRepository } from "@/infra/db";
import { DbLoadRecentPosts } from "./load-recent-posts";

type SutType = {
    sut: LoadRecentPosts;
    loadRecentPostsRepository: LoadRecentPostsRepository;
};

const makeSut = (): SutType => {
    const loadRecentPostsRepository = new PostMongoRepository();
    const sut = new DbLoadRecentPosts(loadRecentPostsRepository);

    return { sut, loadRecentPostsRepository };
};

describe("load-recent-posts.spec usecase", () => {
    it("should return a list of posts.", async () => {
        const { sut } = makeSut();
        const recentPosts = await sut.perform({ authorsIds: ["any_id", "any_sec_id"], limit: 20 });
        expect(Array.isArray(recentPosts)).toBeTruthy();
        expect(recentPosts.length).toBeLessThanOrEqual(20);
    });
});
