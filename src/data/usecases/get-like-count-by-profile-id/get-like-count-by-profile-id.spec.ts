import { GetLikeCountByProfileId } from "@/domain/usecases";
import { GetLikeCountByProfileIdRepository } from "@/data/protocols/db";

class MongoGetLikeCountByProfileIdRepository implements GetLikeCountByProfileIdRepository {
    async countByProfileId(params: GetLikeCountByProfileIdRepository.Params): Promise<GetLikeCountByProfileIdRepository.Result> {
        return 0;
    }
}

class DbGetLikeCountByProfileId implements GetLikeCountByProfileId {
    constructor(private readonly getLikeCountByProfileIdRepository: GetLikeCountByProfileIdRepository) {}

    async perform(params: GetLikeCountByProfileId.Params): Promise<GetLikeCountByProfileId.Result> {
        return this.getLikeCountByProfileIdRepository.countByProfileId({ profileId: params.profileId });
    }
}

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const getLikeCountByProfileIdRepository = new MongoGetLikeCountByProfileIdRepository();
        const sut = new DbGetLikeCountByProfileId(getLikeCountByProfileIdRepository);
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
