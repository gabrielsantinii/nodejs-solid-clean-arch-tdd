export interface CountPostLikes {
    perform: (params: CountPostLikes.Params) => Promise<CountPostLikes.Result>;
}

export namespace CountPostLikes {
    export type Params = { postId: string };
    export type Result = number;
}
