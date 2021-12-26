import { LoadFollowingAuthorsList } from "@/domain/usecases";

export interface LoadFollowingAuthorsListRepository {
    loadFollowingAuthors: (params: LoadFollowingAuthorsListRepository.Params) => Promise<LoadFollowingAuthorsListRepository.Result>;
}

export namespace LoadFollowingAuthorsListRepository {
    export type Params = LoadFollowingAuthorsList.Params;
    export type Result = LoadFollowingAuthorsList.Result;
}
