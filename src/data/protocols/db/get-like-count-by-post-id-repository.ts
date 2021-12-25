import { GetLikeCountByPostId } from "@/domain/usecases";

export interface GetLikeCountByPostIdRepository {
  countLikeByPostId: (params: GetLikeCountByPostIdRepository.Params) => Promise<GetLikeCountByPostIdRepository.Result>;
}
export namespace GetLikeCountByPostIdRepository {
  export type Params = GetLikeCountByPostId.Params;
  export type Result = GetLikeCountByPostId.Result;
}
