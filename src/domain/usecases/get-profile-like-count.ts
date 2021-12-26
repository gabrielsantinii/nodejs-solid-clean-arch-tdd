export interface GetProfileLikeCount {
    perform: (params: GetProfileLikeCount.Params) => Promise<GetProfileLikeCount.Result>;
}

export namespace GetProfileLikeCount {
    export type Params = { profileId: string };
    export type Result = number;
}
