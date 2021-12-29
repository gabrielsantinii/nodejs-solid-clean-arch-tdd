import { ProfileModel } from "@/domain/models";
import { CheckProfileByUsername } from "@/domain/usecases";

export interface CheckProfileByUsernameRepository {
    checkByUsername: (params: CheckProfileByUsernameRepository.Params) => Promise<CheckProfileByUsernameRepository.Result>;
}

export namespace CheckProfileByUsernameRepository {
    export type Params = CheckProfileByUsername.Params;
    export type Result = ProfileModel | undefined;
}