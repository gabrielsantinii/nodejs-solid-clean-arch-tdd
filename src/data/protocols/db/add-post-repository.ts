import { AddPost } from "@/domain/usecases";

export interface AddPostRepository {
    add: (params: AddPostRepository.Params) => Promise<AddPostRepository.Result>;
}

export namespace AddPostRepository {
    export type Params = AddPost.Params;
    export type Result = AddPost.Result;
}
