class GetLikeCountByProfileId {
    async perform({ profileId }: { profileId: string }): Promise<number> {
        return 0;
    }
}

describe("get-like-count-by-profile-id.spec usecase", () => {
    it("should return a numeric count", async () => {
        const sut = new GetLikeCountByProfileId();
        const likesCounts = await sut.perform({ profileId: "any_profile_id" });
        expect(typeof likesCounts).toBe("number");
    });
});
