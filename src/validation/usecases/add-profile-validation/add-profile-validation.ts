import { AddProfile } from "@/domain/usecases";
import { CompositeValidation } from "@/presentation/protocols";
import { BulkValidation, EmailFieldValidation, LengthFieldValidation, UsernameFieldValidation } from "@/validation/validators";

export class AddProfileValidation implements CompositeValidation<AddProfile.Params> {
    readonly fields: Array<keyof Partial<AddProfile.Params>> = ["name", "username", "email", "password"];

    validate(input: any): Error[] {
        const requiredErrors = new BulkValidation(this.fields).validateRequired(input);
        if (requiredErrors.length) return requiredErrors;

        let invalidErrors = [];

        const lengthErrors = this.validateLengthFields(input);
        invalidErrors = invalidErrors.concat(lengthErrors);

        const emailError = new EmailFieldValidation("email").validate(input);
        if (emailError) invalidErrors.push(emailError);

        const usernameError = new UsernameFieldValidation("username").validate(input);
        if (usernameError) invalidErrors.push(usernameError);

        return invalidErrors;
    }

    private validateLengthFields(input: any): Error[] {
        const errors: Error[] = [];
        this.fields.forEach((fieldName) => {
            const fieldError = new LengthFieldValidation({ fieldName, min: 3, max: 45 }).validate(input);
            if (fieldError) errors.push(fieldError);
        });

        const passwordLengthError = new LengthFieldValidation({ fieldName: "password", min: 6, max: 45 }).validate(input);
        if (passwordLengthError) errors.push(passwordLengthError);

        return errors;
    }
}
