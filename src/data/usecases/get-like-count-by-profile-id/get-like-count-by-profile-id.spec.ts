import { GetLikeCountByProfileId } from "@/domain/usecases";

class GetLikeCountByProfileIdRepository {
    async countByProfileId({ profileId }: { profileId: string }): Promise<number> {
        return 0;
    }
}

class DbGetLikeCountByProfileId implements GetLikeCountByProfileId { 
    constructor(private readonly getLikeCountByProfileIdRepository: GetLikeCountByProfileIdRepository) {}

    async perform({ profileId }: { profileId: string }): Promise<number> {
        return this.getLikeCountByProfileIdRepository.countByProfileId({ profileId });
    }
}

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const getLikeCountByProfileIdRepository = new GetLikeCountByProfileIdRepository();
        const sut = new DbGetLikeCountByProfileId(getLikeCountByProfileIdRepository);
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
