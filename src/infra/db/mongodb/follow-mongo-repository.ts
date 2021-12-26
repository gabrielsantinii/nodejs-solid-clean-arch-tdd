import { LoadFollowingAuthorsListRepository } from "@/data/protocols/db";

export class FollowMongoRepository implements LoadFollowingAuthorsListRepository {
    async loadFollowingAuthors(params: LoadFollowingAuthorsListRepository.Params): Promise<LoadFollowingAuthorsListRepository.Result> {
        return ["any_id"];
    }
}
