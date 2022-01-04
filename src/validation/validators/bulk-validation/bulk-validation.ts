import { RequiredFieldValidation } from "..";

export class BulkValidation {
    constructor(private readonly fields: string[]) {}

    validateRequired(input: any): Error[] {
        const errors: Error[] = [];
        this.fields.forEach((field) => {
            const fieldError = new RequiredFieldValidation(field).validate(input);
            if (fieldError) errors.push(fieldError);
        });

        return errors;
    }
}