export interface LoadFollowingAuthorsList {
    perform: (params: LoadFollowingAuthorsList.Params) => Promise<LoadFollowingAuthorsList.Result>;
}

export namespace LoadFollowingAuthorsList {
    export type Params = { followedBy: string };
    export type Result = string[];
}
