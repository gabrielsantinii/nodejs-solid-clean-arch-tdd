import { ProfileModel } from "@/domain/models";
import { mockProfileModel } from "@/tests/domain/mocks/mock-profile";

class LoadFollowingAuthorsList {
    async perform({ followedBy }: { followedBy: string }): Promise<ProfileModel[]> {
        return [{ ...mockProfileModel() }];
    }
}

describe("load-following-authors-list.spec usecase", () => {
    it("should return a list with following authors.", async () => {
        const sut = new LoadFollowingAuthorsList();
        const followingAuthors = await sut.perform({ followedBy: "any_profile_id" });
        expect(Array.isArray(followingAuthors)).toBe(true);
        expect(followingAuthors.some((a) => !!a.id)).toBe(true);
    });
});
