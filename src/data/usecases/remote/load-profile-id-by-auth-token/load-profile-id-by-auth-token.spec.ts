import { LoadAuthIdByAuthTokenAdapter } from "@/data/protocols/remote";
import { LoadProfileIdByAuthToken } from "@/domain/usecases";


class LoadAuthIdByAuthTokenAdapterSpy implements LoadAuthIdByAuthTokenAdapter {
    result: LoadAuthIdByAuthTokenAdapter.Result = { authId: undefined };
    async loadAuthIdByToken(params: LoadAuthIdByAuthTokenAdapter.Params): Promise<LoadAuthIdByAuthTokenAdapter.Result> {
        return this.result;
    }
}

class RemoteLoadProfileIdByAuthToken implements LoadProfileIdByAuthToken {
    constructor(private readonly loadAuthIdByAuthTokenAdapter: LoadAuthIdByAuthTokenAdapter) {}

    async perform(params: LoadProfileIdByAuthToken.Params): Promise<LoadProfileIdByAuthToken.Result> {
        const profileByTokenResult = await this.loadAuthIdByAuthTokenAdapter.loadAuthIdByToken({ token: params.authToken });
        return { profileId: profileByTokenResult.authId };
    }
}

type SutType = {
    sut: RemoteLoadProfileIdByAuthToken;
    loadAuthIdByAuthTokenAdapterSpy: LoadAuthIdByAuthTokenAdapterSpy;
};

const makeSut = (): SutType => {
    const loadAuthIdByAuthTokenAdapterSpy = new LoadAuthIdByAuthTokenAdapterSpy();
    const sut = new RemoteLoadProfileIdByAuthToken(loadAuthIdByAuthTokenAdapterSpy);
    return { loadAuthIdByAuthTokenAdapterSpy, sut };
};

describe("load-profile-id-by-auth-token.spec usecase", () => {
    it("should return undefined profileId for non-existing auth-token.", async () => {
       const { sut } = makeSut()
        const profileByAuthToken = await sut.perform({ authToken: "any_token" });
        expect(profileByAuthToken.profileId).toBeUndefined();
    });

    it("should return profileId for valid auth-token.", async () => {
        const { sut, loadAuthIdByAuthTokenAdapterSpy } = makeSut()
        loadAuthIdByAuthTokenAdapterSpy.result = { authId: 'existing-profile-id' }
        const profileByAuthToken = await sut.perform({ authToken: "any_token" });
        expect(profileByAuthToken.profileId).toBe('existing-profile-id');
    });
});
