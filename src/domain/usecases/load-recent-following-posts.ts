import { PostModel } from "../models";

export interface LoadRecentFollowingPosts {
    perform: (params: LoadRecentFollowingPosts.Params) => Promise<LoadRecentFollowingPosts.Result>;
}

export namespace LoadRecentFollowingPosts {
    export type Params = { authorsId: string[] };
    export type Result = PostModel[];
}
