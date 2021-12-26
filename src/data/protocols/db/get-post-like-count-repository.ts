import { GetPostLikeCount } from "@/domain/usecases";

export interface GetPostLikeCountRepository {
    countLikeByPostId: (params: GetPostLikeCountRepository.Params) => Promise<GetPostLikeCountRepository.Result>;
}
export namespace GetPostLikeCountRepository {
    export type Params = GetPostLikeCount.Params;
    export type Result = GetPostLikeCount.Result;
}
