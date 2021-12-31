import { AddProfile } from "@/domain/usecases";
import { CompositeValidation } from "@/presentation/protocols";
import { EmailFieldValidation, LengthFieldValidation, RequiredFieldValidation } from "@/validation/validators";

export class AddProfileValidation implements CompositeValidation<AddProfile.Params> {
    readonly fields: Array<keyof Partial<AddProfile.Params>> = ["name", "username", "email", "password"];

    validate(input: any): Error[] {
        const requiredErrors = this.validateRequiredFields(input);
        if (requiredErrors.length) return requiredErrors;

        const invalidErrors = [];

        const lengthErrors = this.validateLengthFields(input);
        invalidErrors.concat(lengthErrors);

        const emailError = new EmailFieldValidation("email").validate(input);
        if (emailError) invalidErrors.push(emailError);

        return invalidErrors;
    }

    private validateRequiredFields(input: any): Error[] {
        const errors: Error[] = [];
        this.fields.forEach((field) => {
            const fieldError = new RequiredFieldValidation(field).validate(input);
            if (fieldError) errors.push(fieldError);
        });

        return errors;
    }

    private validateLengthFields(input: any): Error[] {
        const errors: Error[] = [];
        this.fields.forEach((fieldName) => {
            const fieldError = new LengthFieldValidation({ fieldName, min: 3, max: 45 }).validate(input);
            if (fieldError) errors.push(fieldError);
        });

        return errors;
    }
}
