export interface CheckProfileByEmail {
    perform: (params: CheckProfileByEmail.Params) => Promise<CheckProfileByEmail.Result>;
}

export namespace CheckProfileByEmail {
    export type Params = { email: string };
    export type Result = boolean;
}