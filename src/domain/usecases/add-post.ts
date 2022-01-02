import { PostModel } from "@/domain/models";

export interface AddPost {
    perform: (params: AddPost.Params) => Promise<AddPost.Result>;
}

export namespace AddPost {
    export type Params = {
        contentDescription: string;
        postedBy: {
            id: string;
            name: string;
            username: string;
            avatarUrl: string;
        };
    };
    export type Result = PostModel;
}