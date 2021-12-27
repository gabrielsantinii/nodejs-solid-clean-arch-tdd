import { AddProfile } from "@/domain/usecases";
import { ValidationComposite } from "@/validation/protocols";
import { RequiredFieldValidation } from "@/validation/validators";

export class AddAccountValidation implements ValidationComposite<AddProfile.Params> {
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