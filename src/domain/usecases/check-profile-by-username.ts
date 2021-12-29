export interface CheckProfileByUsername {
    perform: (params: CheckProfileByUsername.Params) => Promise<CheckProfileByUsername.Result>;
}

export namespace CheckProfileByUsername {
    export type Params = { username: string };
    export type Result = boolean;
}