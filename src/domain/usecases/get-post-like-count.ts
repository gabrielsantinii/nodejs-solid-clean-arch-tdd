export interface GetPostLikeCount {
    perform: (params: GetPostLikeCount.Params) => Promise<GetPostLikeCount.Result>;
}

export namespace GetPostLikeCount {
    export type Params = { postId: string };
    export type Result = number;
}
