import { GetLikeCountByProfileId } from "@/domain/usecases";

export interface GetLikeCountByProfileIdRepository {
    countByProfileId: (params: GetLikeCountByProfileIdRepository.Params) => Promise<GetLikeCountByProfileIdRepository.Result>;
}

export namespace GetLikeCountByProfileIdRepository {
    export type Params = GetLikeCountByProfileId.Params;
    export type Result = GetLikeCountByProfileId.Result;
}
