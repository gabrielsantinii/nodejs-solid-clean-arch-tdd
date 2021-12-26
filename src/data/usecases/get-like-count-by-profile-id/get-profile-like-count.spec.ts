import { GetProfileLikeCountRepository } from "@/data/protocols/db";
import { GetProfileLikeCount } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";
import { DbGetProfileLikeCount } from "./get-profile-like-count";

type SutType = {
    sut: GetProfileLikeCount;
    getProfileLikeCountRepository: GetProfileLikeCountRepository;
};

const makeSut = (): SutType => {
    const getProfileLikeCountRepository = new LikeMongoRepository();
    const sut = new DbGetProfileLikeCount(getProfileLikeCountRepository);
    return { sut, getProfileLikeCountRepository };
};

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const { sut } = makeSut();
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
