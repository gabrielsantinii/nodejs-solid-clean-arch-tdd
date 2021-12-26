import { LikeMongoRepository } from "@/infra/db";
import { DbGetLikeCountByProfileId } from "./get-like-count-by-profile-id";

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const getLikeCountByProfileIdRepository = new LikeMongoRepository();
        const sut = new DbGetLikeCountByProfileId(getLikeCountByProfileIdRepository);
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
