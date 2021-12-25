import { GetProfileById } from "@/domain/usecases";

export interface GetProfileByIdRepository {
    getProfileById: (params: GetProfileByIdRepository.Params) => Promise<GetProfileByIdRepository.Result>;
}

export namespace GetProfileByIdRepository {
    export type Params = GetProfileById.Params;
    export type Result = GetProfileById.Result;
}
