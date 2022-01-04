import { AddPostController } from "@/presentation/controllers";
import { CompositeValidation } from "@/presentation/protocols";
import { BulkValidation } from "@/validation/validators";

class AddPostValidation implements CompositeValidation<AddPostController.Request> {
    readonly fields: Array<keyof AddPostController.Request> = ["authorId", "contentDescription"];

    validate(input: any): Error[] {
        const requiredErrors = new BulkValidation(this.fields).validateRequired(input);
        return requiredErrors;
    }
}

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
