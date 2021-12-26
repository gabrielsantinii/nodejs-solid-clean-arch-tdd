import { CountPostLikesRepository } from "@/data/protocols/db";
import { CountPostLikes } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";
import { DbCountPostLikes } from "./count-post-likes";

type SutType = {
    sut: CountPostLikes;
    countPostLikesRepository: CountPostLikesRepository;
};

const makeSut = (): SutType => {
    const countPostLikesRepository = new LikeMongoRepository();
    const sut = new DbCountPostLikes(countPostLikesRepository);
    return { sut, countPostLikesRepository };
};

describe("get-like-count-by-post-id usecase", () => {
    it("should return the count of likes in some post based on postId", async () => {
        const { sut } = makeSut();
        const likeCount = await sut.perform({ postId: "any_post_id" });
        expect(typeof likeCount).toBe("number");
    });
});
