import { GetProfileLikeCount } from "@/domain/usecases";

export interface GetProfileLikeCountRepository {
    countByProfileId: (params: GetProfileLikeCountRepository.Params) => Promise<GetProfileLikeCountRepository.Result>;
}

export namespace GetProfileLikeCountRepository {
    export type Params = GetProfileLikeCount.Params;
    export type Result = GetProfileLikeCount.Result;
}
