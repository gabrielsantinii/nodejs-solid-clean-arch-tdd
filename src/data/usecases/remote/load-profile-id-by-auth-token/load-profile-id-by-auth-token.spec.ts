import { LoadProfileIdByAuthToken } from "@/domain/usecases";

export interface LoadProfileIdByAuthTokenAdapter {
    loadAuthIdByToken: (params: LoadProfileIdByAuthTokenAdapter.Params) => Promise<LoadProfileIdByAuthTokenAdapter.Result>;
}

export namespace LoadProfileIdByAuthTokenAdapter {
    export type Params = { token: string };
    export type Result = { authId: string };
}

class LoadProfileIdByAuthTokenAdapterSpy implements LoadProfileIdByAuthTokenAdapter {
    result: LoadProfileIdByAuthTokenAdapter.Result = { authId: undefined };
    async loadAuthIdByToken(params: LoadProfileIdByAuthTokenAdapter.Params): Promise<LoadProfileIdByAuthTokenAdapter.Result> {
        return this.result;
    }
}

class RemoteLoadProfileIdByAuthToken implements LoadProfileIdByAuthToken {
    constructor(private readonly loadProfileIdByAuthTokenAdapter: LoadProfileIdByAuthTokenAdapter) {}

    async perform(params: LoadProfileIdByAuthToken.Params): Promise<LoadProfileIdByAuthToken.Result> {
        return { profileId: "any-profile-id" };
    }
}

describe("load-profile-id-by-auth-token.spec usecase", () => {
    it("should return profileId for valid auth-token.", async () => {
        const loadProfileIdByAuthTokenAdapterSpy = new LoadProfileIdByAuthTokenAdapterSpy()
        const sut = new RemoteLoadProfileIdByAuthToken(loadProfileIdByAuthTokenAdapterSpy);
        const profileByAuthToken = await sut.perform({ authToken: "any_token" });
        expect(profileByAuthToken).toHaveProperty("profileId");
    });
});
