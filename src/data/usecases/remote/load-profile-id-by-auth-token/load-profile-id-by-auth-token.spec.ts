import { LoadProfileIdByAuthToken } from "@/domain/usecases";

class RemoteLoadProfileIdByAuthToken implements LoadProfileIdByAuthToken {
    async perform(params: LoadProfileIdByAuthToken.Params): Promise<LoadProfileIdByAuthToken.Result> {
        return { profileId: "any-profile-id" };
    }
}

describe("load-profile-id-by-auth-token.spec usecase", () => {
    it("should return profileId for valid auth-token.", async () => {
        const sut = new RemoteLoadProfileIdByAuthToken();
        const profileByAuthToken = await sut.perform({ authToken: "any_token" });
        expect(profileByAuthToken).toHaveProperty("profileId");
    });
});
