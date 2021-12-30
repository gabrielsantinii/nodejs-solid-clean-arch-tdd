export interface LoadFollowingAuthorsList {
    perform: (params: LoadFollowingAuthorsList.Params) => Promise<LoadFollowingAuthorsList.Result>;
}

export namespace LoadFollowingAuthorsList {
    export type Params = { followingId: string };
    export type Result = string[];
}
