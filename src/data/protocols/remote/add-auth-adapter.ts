import { AddAuth } from "@/domain/usecases";

export interface AddAuthAdapter {
    add: (params: AddAuthAdapter.Params) => Promise<AddAuthAdapter.Result>;
}

export namespace AddAuthAdapter {
    export type Params = AddAuth.Params;
    export type Result = AddAuth.Result;
}
