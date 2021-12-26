import { LoadFollowingAuthorsListRepository } from "@/data/protocols/db";
import { LoadFollowingAuthorsList } from "@/domain/usecases";

export class DbLoadFollowingAuthorsList implements LoadFollowingAuthorsList {
    constructor(private readonly loadFollowingAuthorsListRepository: LoadFollowingAuthorsListRepository) {}

    async perform(params: LoadFollowingAuthorsList.Params): Promise<LoadFollowingAuthorsList.Result> {
        return this.loadFollowingAuthorsListRepository.loadFollowingAuthors({ followedBy: params.followedBy });
    }
}