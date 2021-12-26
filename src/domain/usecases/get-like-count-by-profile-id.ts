export interface GetLikeCountByProfileId {
    perform: (params: GetLikeCountByProfileId.Params) => Promise<GetLikeCountByProfileId.Result>;
}

export namespace GetLikeCountByProfileId {
    export type Params = { profileId: string };
    export type Result = number;
}
