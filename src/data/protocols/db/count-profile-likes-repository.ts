import { CountProfileLikes } from "@/domain/usecases";

export interface CountProfileLikesRepository {
    countByProfileId: (params: CountProfileLikesRepository.Params) => Promise<CountProfileLikesRepository.Result>;
}

export namespace CountProfileLikesRepository {
    export type Params = CountProfileLikes.Params;
    export type Result = CountProfileLikes.Result;
}
