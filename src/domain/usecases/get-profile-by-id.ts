export interface GetProfileById {
  perform: (params: GetProfileById.Params) => Promise<GetProfileById.Result>;
}

export namespace GetProfileById {
  export type Params = {
    profileId: string;
  };

  export type Result =
    | {
        id: string;
      }
    | undefined;
}
