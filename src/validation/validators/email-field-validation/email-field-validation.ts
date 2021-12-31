import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class EmailFieldValidation implements Validation {
    private readonly validEmailPattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private readonly fieldName: string) {}

    validate(input: any): Error {
        const emailToValidate = String(input[this.fieldName]);
        if (!emailToValidate.match(this.validEmailPattern)) return new InvalidParamError(this.fieldName);
    }
}