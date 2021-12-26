import { ProfileModel } from "@/domain/models";

export interface LoadProfile {
    perform: (params: LoadProfile.Params) => Promise<LoadProfile.Result>;
}

export namespace LoadProfile {
    export type Params = {
        profileId: string;
    };

    export type Result = ProfileModel | undefined;
}
