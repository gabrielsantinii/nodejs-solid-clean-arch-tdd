export interface GetLikeCountByPostId {
    perform: (params: GetLikeCountByPostId.Params) => Promise<GetLikeCountByPostId.Result>;
}

export namespace GetLikeCountByPostId {
    export type Params = { postId: string };
    export type Result = number;
}
