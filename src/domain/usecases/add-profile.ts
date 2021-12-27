import { ProfileModel } from "@/domain/models";

export interface AddProfile {
    perform: (params: AddProfile.Params) => Promise<AddProfile.Result>;
}

export namespace AddProfile {
    export type Params = {
        name: string;
        username: string;
        password: string;
        email: string;
        description?: string;
    };
    export type Result = ProfileModel;
}
