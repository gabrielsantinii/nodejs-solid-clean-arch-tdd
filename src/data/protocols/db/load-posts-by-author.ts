import { LoadPostsByAuthor } from "@/domain/usecases";

export interface LoadPostsByAuthorRepository {
    loadByAuthor: (params: LoadPostsByAuthorRepository.Params) => Promise<LoadPostsByAuthorRepository.Result>;
}

export namespace LoadPostsByAuthorRepository {
    export type Params = LoadPostsByAuthor.Params;
    export type Result = LoadPostsByAuthor.Result;
}