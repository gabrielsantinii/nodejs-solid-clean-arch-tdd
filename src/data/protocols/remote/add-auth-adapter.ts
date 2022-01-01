import { AddAuth } from "@/domain/usecases";

export interface AddAuthAdapter {
    add: (params: AddAuthAdapter.Params) => Promise<AddAuthAdapter.Result>;
}

export namespace AddAuthAdapter {
    export type Params = { email: string; password: string; authId: string };
    export type Result = { authId: string };
}
