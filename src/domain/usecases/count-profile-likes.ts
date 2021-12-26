export interface CountProfileLikes {
    perform: (params: CountProfileLikes.Params) => Promise<CountProfileLikes.Result>;
}

export namespace CountProfileLikes {
    export type Params = { profileId: string };
    export type Result = number;
}
