class LoadFollowingAuthorsList {
    async perform({ followedBy }: { followedBy: string }): Promise<string[]> {
        return ["any_id", "any_name"];
    }
}

describe("load-following-authors-list.spec usecase", () => {
    it("should return a list with following authors.", async () => {
        const sut = new LoadFollowingAuthorsList();
        const followingAuthors = await sut.perform({ followedBy: "any_profile_id" });
        expect(Array.isArray(followingAuthors)).toBe(true);
        expect(followingAuthors.some((f) => typeof f !== "string")).toBe(false);
    });
});
