import { PostModel } from "@/domain/models";

export interface LoadPostsByAuthor {
    perform: (params: LoadPostsByAuthor.Params) => Promise<LoadPostsByAuthor.Result>;
}

export namespace LoadPostsByAuthor {
    export type Params = { authorId: string };
    export type Result = PostModel[];
}
