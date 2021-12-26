import { CountPostLikes } from "@/domain/usecases";

export interface CountPostLikesRepository {
    countLikeByPostId: (params: CountPostLikesRepository.Params) => Promise<CountPostLikesRepository.Result>;
}
export namespace CountPostLikesRepository {
    export type Params = CountPostLikes.Params;
    export type Result = CountPostLikes.Result;
}
