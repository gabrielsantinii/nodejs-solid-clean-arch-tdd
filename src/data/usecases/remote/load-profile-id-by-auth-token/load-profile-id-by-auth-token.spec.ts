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
        const profileByTokenResult = await this.loadProfileIdByAuthTokenAdapter.loadAuthIdByToken({ token: params.authToken });
        return { profileId: profileByTokenResult.authId };
    }
}

type SutType = {
    sut: RemoteLoadProfileIdByAuthToken;
    loadProfileIdByAuthTokenAdapterSpy: LoadProfileIdByAuthTokenAdapterSpy;
};

const makeSut = (): SutType => {
    const loadProfileIdByAuthTokenAdapterSpy = new LoadProfileIdByAuthTokenAdapterSpy();
    const sut = new RemoteLoadProfileIdByAuthToken(loadProfileIdByAuthTokenAdapterSpy);
    return { loadProfileIdByAuthTokenAdapterSpy, sut };
};

describe("load-profile-id-by-auth-token.spec usecase", () => {
    it("should return undefined profileId for non-existing auth-token.", async () => {
       const { sut } = makeSut()
        const profileByAuthToken = await sut.perform({ authToken: "any_token" });
        expect(profileByAuthToken.profileId).toBeUndefined();
    });

    it("should return profileId for valid auth-token.", async () => {
        const { sut, loadProfileIdByAuthTokenAdapterSpy } = makeSut()
        loadProfileIdByAuthTokenAdapterSpy.result = { authId: 'existing-profile-id' }
        const profileByAuthToken = await sut.perform({ authToken: "any_token" });
        expect(profileByAuthToken.profileId).toBe('existing-profile-id');
    });
});
