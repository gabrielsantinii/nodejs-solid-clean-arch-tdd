import { PostModel } from "@/domain/models";
import { mockPostModel } from "@/tests/domain/mocks";
import faker from "faker";

class AddPost {
    async perform(params: {
        contentDescription: string;
        postedBy: { id: string; name: string; username: string; avatarUrl: string };
    }): Promise<PostModel> {
        return mockPostModel();
    }
}

describe("add-post.spec usecase", () => {
    it("should return the id of saved post.", async () => {
        const sut = new AddPost();
        const savedPost = await sut.perform({
            contentDescription: faker.lorem.lines(3),
            postedBy: {
                avatarUrl: "any_avatar",
                id: faker.datatype.uuid(),
                name: "any_name",
                username: "any_username",
            },
        });
        expect(savedPost.id).toBeTruthy()
    });
});
