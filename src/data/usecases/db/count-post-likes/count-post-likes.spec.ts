import { CountPostLikesRepository } from "@/data/protocols/db";
import { CountPostLikes } from "@/domain/usecases";
import { DbCountPostLikes } from "@/data/usecases/db";

class CountPostLikesRepositorySpy implements  CountPostLikesRepository {
    result: CountPostLikesRepository.Result = 10

    async countLikeByPostId(params: CountPostLikes.Params): Promise<CountPostLikesRepository.Result> {
        return this.result
    }
}

type SutType = {
    sut: CountPostLikes;
    countPostLikesRepositorySpy: CountPostLikesRepositorySpy;
};

const makeSut = (): SutType => {
    const countPostLikesRepositorySpy = new CountPostLikesRepositorySpy();
    const sut = new DbCountPostLikes(countPostLikesRepositorySpy);
    return { sut, countPostLikesRepositorySpy };
};

describe("get-like-count-by-post-id usecase", () => {
    it("should return the count of likes in some post based on postId", async () => {
        const { sut } = makeSut();
        const likeCount = await sut.perform({ postId: "any_post_id" });
        expect(typeof likeCount).toBe("number");
    });
});
