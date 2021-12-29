import { ProfileModel } from "@/domain/models";
import { CheckProfileByEmail } from "@/domain/usecases";

export interface CheckProfileByEmailRepository {
    checkByEmail: (params: CheckProfileByEmailRepository.Params) => Promise<CheckProfileByEmailRepository.Result>;
}

export namespace CheckProfileByEmailRepository {
    export type Params = CheckProfileByEmail.Params;
    export type Result = ProfileModel | undefined;
}