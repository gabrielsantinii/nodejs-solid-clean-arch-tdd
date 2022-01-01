export interface LoadAuthIdByAuthTokenAdapter {
    loadAuthIdByToken: (params: LoadAuthIdByAuthTokenAdapter.Params) => Promise<LoadAuthIdByAuthTokenAdapter.Result>;
}

export namespace LoadAuthIdByAuthTokenAdapter {
    export type Params = { token: string };
    export type Result = { authId: string };
}
