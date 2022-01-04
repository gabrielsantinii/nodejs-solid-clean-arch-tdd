import { InvalidParamError } from "@/presentation/errors";
import { httpResponse } from "@/presentation/helpers";
import { Controller } from "@/presentation/protocols";

class AddPostController implements Controller {
    async handle(request: { authorId: string }) {
        return httpResponse.badRequest([new InvalidParamError("authorId")]);
    }
}

describe("add-post-controller.spec usecase", () => {
    it("should return 400 for non-existing authorId.", async () => {
        const sut = new AddPostController();
        const controllerResponse = await sut.handle({ authorId: "any_author_id" });
        expect(controllerResponse).toEqual(httpResponse.badRequest([new InvalidParamError("authorId")]));
    });
});
