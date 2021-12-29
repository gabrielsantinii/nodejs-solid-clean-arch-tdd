import { AddProfile } from "@/domain/usecases";
import { CompositeValidation } from "@/presentation/protocols";
import { RequiredFieldValidation } from "@/validation/validators";

export class AddProfileValidation implements CompositeValidation<AddProfile.Params> {
    readonly fields: Array<keyof Partial<AddProfile.Params>> = ["name", "username", "email", "password"];

    validate(input: any): Error[] {
        let errors: Error[] = [];
        this.fields.forEach((field) => {
            const fieldError = new RequiredFieldValidation(field).validate(input);
            if (fieldError) errors.push(fieldError);
        });

        return errors;
    }
}