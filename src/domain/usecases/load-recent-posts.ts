import { PostModel } from "../models";

export interface LoadRecentPosts {
    perform: (params: LoadRecentPosts.Params) => Promise<LoadRecentPosts.Result>;
}

export namespace LoadRecentPosts {
    export type Params = { authorsIds: string[] };
    export type Result = PostModel[];
}
