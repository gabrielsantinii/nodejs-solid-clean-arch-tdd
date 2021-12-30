import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { IdValidator } from "@/validation/protocols";

export class IdFieldValidation implements Validation {
    constructor(private readonly fieldName: string, private readonly idValidator: IdValidator) {}

    validate(input: any): Error {
        const isValid = this.idValidator.isValid(input[this.fieldName]);
        if (!isValid) return new InvalidParamError(this.fieldName);
    }
}