export interface LoadProfileIdByAuthToken {
    perform: (params: LoadProfileIdByAuthToken.Params) => Promise<LoadProfileIdByAuthToken.Result>;
}

export namespace LoadProfileIdByAuthToken {
    export type Params = { authToken: string };
    export type Result = { profileId: string } | undefined;
}
