import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class EmailFieldValidation implements Validation {
    private readonly regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private readonly fieldName: string) {}

    validate(input: any): Error {
        const val = String(input[this.fieldName]);
        if (!val.match(this.regExp)) return new InvalidParamError(this.fieldName);
    }
}