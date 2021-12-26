import { LoadProfile } from "@/domain/usecases";

export interface LoadProfileRepository {
    loadProfile: (params: LoadProfileRepository.Params) => Promise<LoadProfileRepository.Result>;
}

export namespace LoadProfileRepository {
    export type Params = LoadProfile.Params;
    export type Result = LoadProfile.Result;
}
