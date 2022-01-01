import { LoadAuthIdByAuthTokenAdapter } from "@/data/protocols/remote";
import { LoadProfileIdByAuthToken } from "@/domain/usecases";

export class RemoteLoadProfileIdByAuthToken implements LoadProfileIdByAuthToken {
    constructor(private readonly loadAuthIdByAuthTokenAdapter: LoadAuthIdByAuthTokenAdapter) {}

    async perform(params: LoadProfileIdByAuthToken.Params): Promise<LoadProfileIdByAuthToken.Result> {
        const profileByTokenResult = await this.loadAuthIdByAuthTokenAdapter.loadAuthIdByToken({ token: params.authToken });
        return { profileId: profileByTokenResult.authId };
    }
}