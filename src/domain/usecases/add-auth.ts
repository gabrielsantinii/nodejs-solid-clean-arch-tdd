export interface AddAuth {
    perform: (params: AddAuth.Params) => Promise<AddAuth.Result>;
}

export namespace AddAuth {
    export type Params = { email: string; password: string };
    export type Result = { authId: string };
}
