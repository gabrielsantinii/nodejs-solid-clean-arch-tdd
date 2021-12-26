import { GetPostLikeCountRepository } from "@/data/protocols/db";
import { GetPostLikeCount } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";
import { DbGetPostLikeCount } from "./get-post-like-count";

type SutType = {
    sut: GetPostLikeCount;
    getPostLikeCountRepository: GetPostLikeCountRepository;
};

const makeSut = (): SutType => {
    const getPostLikeCountRepository = new LikeMongoRepository();
    const sut = new DbGetPostLikeCount(getPostLikeCountRepository);
    return { sut, getPostLikeCountRepository };
};

describe("get-like-count-by-post-id usecase", () => {
    it("should return the count of likes in some post based on postId", async () => {
        const { sut } = makeSut();
        const likeCount = await sut.perform({ postId: "any_post_id" });
        expect(typeof likeCount).toBe("number");
    });
});
