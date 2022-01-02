import faker from "faker";
import { AddPostRepository } from "@/data/protocols/db";
import { AddPost } from "@/domain/usecases";
import { mockPostModel } from "@/tests/domain/mocks";
import { DbAddPost } from "@/data/usecases/db";

const mockAddPostParams = (): AddPost.Params => ({
    contentDescription: faker.lorem.lines(3),
    postedBy: {
        avatarUrl: "any_avatar",
        id: faker.datatype.uuid(),
        name: "any_name",
        username: "any_username",
    },
});

class AddPostRepositorySpy implements AddPostRepository {
    result: AddPostRepository.Result = mockPostModel();
    async add(params: AddPostRepository.Params): Promise<AddPostRepository.Result> {
        return this.result;
    }
}

const makeSut = () => {
    const addPostRepositorySpy = new AddPostRepositorySpy();
    const sut = new DbAddPost(addPostRepositorySpy);
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
            addPostRepositorySpy.result = undefined;
            await sut.perform(mockAddPostParams());
        } catch (err) {
            error = err;
        }
        expect(error).toBeTruthy();
    });
});
