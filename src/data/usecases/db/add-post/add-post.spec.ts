import { PostModel } from "@/domain/models";
import { mockPostModel } from "@/tests/domain/mocks";
import faker from "faker";

const mockAddPostParams = (): AddPost.Params => ({
    contentDescription: faker.lorem.lines(3),
    postedBy: {
        avatarUrl: "any_avatar",
        id: faker.datatype.uuid(),
        name: "any_name",
        username: "any_username",
    },
});

interface AddPostRepository {
    add: (params: AddPostRepository.Params) => Promise<AddPostRepository.Result>;
}

namespace AddPostRepository {
    export type Params = AddPost.Params;
    export type Result = AddPost.Result;
}

class AddPostRepositorySpy implements AddPostRepository {
    result: AddPostRepository.Result = mockPostModel();
    async add(params: AddPostRepository.Params): Promise<AddPostRepository.Result> {
        return this.result;
    }
}

export class AddPost {
    constructor(private readonly addPostRepository: AddPostRepository) {}
    
    async perform(params: AddPost.Params): Promise<AddPost.Result> {
        const savedPost = await this.addPostRepository.add(params)
        if (!savedPost?.id) throw new Error('Could not add post')
        return savedPost
    }
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

const makeSut = () => {
    const addPostRepositorySpy = new AddPostRepositorySpy();
    const sut = new AddPost(addPostRepositorySpy);
    return { sut, addPostRepositorySpy };
};

describe("add-post.spec usecase", () => {
    it("should return the id of saved post.", async () => {
        const { sut } = makeSut();
        const savedPost = await sut.perform(mockAddPostParams());
        expect(savedPost.id).toBeTruthy();
    });

    it("should reject on missing id of saved post.", async () => {
        const { sut, addPostRepositorySpy } = makeSut();
        let error: Error;
        try {
            addPostRepositorySpy.result = undefined
            await sut.perform(mockAddPostParams());
        } catch (err) {
            error = err;
        }
        expect(error).toBeTruthy();
    });
});
