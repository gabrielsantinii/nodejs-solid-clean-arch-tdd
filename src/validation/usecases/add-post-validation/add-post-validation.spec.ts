import { AddPostValidation } from "./add-post-validation";

describe("add-post-validation.spec usecase", () => {
    it("should return errors with length 1 for authorId filled", async () => {
        const sut = new AddPostValidation();
        const errors = sut.validate({ authorId: "any_author_id" });
        expect(errors).toHaveLength(1);
    });

    it("should return 2 errors for falsy values", async () => {
        const sut = new AddPostValidation();
        const errors = sut.validate({ authorId: "", contentDescription: "" });
        expect(errors).toHaveLength(2);
    });
});
