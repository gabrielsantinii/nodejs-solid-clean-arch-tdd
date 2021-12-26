import { GetLikeCountByProfileIdRepository } from "@/data/protocols/db";
import { GetLikeCountByProfileId } from "@/domain/usecases";
import { LikeMongoRepository } from "@/infra/db";
import { DbGetLikeCountByProfileId } from "./get-like-count-by-profile-id";

type SutType = {
    sut: GetLikeCountByProfileId;
    getLikeCountByProfileIdRepository: GetLikeCountByProfileIdRepository;
};

const makeSut = (): SutType => {
    const getLikeCountByProfileIdRepository = new LikeMongoRepository();
    const sut = new DbGetLikeCountByProfileId(getLikeCountByProfileIdRepository);
    return { sut, getLikeCountByProfileIdRepository };
};

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const { sut } = makeSut();
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
