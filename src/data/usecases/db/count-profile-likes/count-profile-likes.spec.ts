import { CountProfileLikesRepository } from "@/data/protocols/db";
import { CountProfileLikes } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";
import { DbCountProfileLikes } from "@/data/usecases/db";

type SutType = {
    sut: CountProfileLikes;
    countProfileLikesRepository: CountProfileLikesRepository;
};

const makeSut = (): SutType => {
    const countProfileLikesRepository = new LikeMongoRepository();
    const sut = new DbCountProfileLikes(countProfileLikesRepository);
    return { sut, countProfileLikesRepository };
};

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const { sut } = makeSut();
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
