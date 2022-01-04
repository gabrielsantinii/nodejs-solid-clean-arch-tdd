import { AddPostController } from "@/presentation/controllers";
import { CompositeValidation } from "@/presentation/protocols";
import { BulkValidation } from "@/validation/validators";

export class AddPostValidation implements CompositeValidation<AddPostController.Request> {
    readonly fields: Array<keyof AddPostController.Request> = ["authorId", "contentDescription"];

    validate(input: any): Error[] {
        const requiredErrors = new BulkValidation(this.fields).validateRequired(input);
        return requiredErrors;
    }
}