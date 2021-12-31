import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class UsernameFieldValidation implements Validation {
    private readonly transformations: Array<(v: string) => string> = [
        (v) => v.toLowerCase(),
        function removeAllAccents(v) {
            return v.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        },
    ];
    private readonly validations: Array<(v: string) => boolean> = [
        function onlyAlphanumeric(v) {
            return !!v.match(/^[a-z0-9_]/g);
        },
        (v) => v[0] !== "_",
        (v) => v[v.length - 1] !== "_",
        (v) => !v.includes("__"),
        (v) => !v.includes("@"),
    ];
    constructor(private readonly fieldName: string) {}

    validate(input: any): Error {
        const usernameToValidate = input[this.fieldName];
        let transformedUsername = String(usernameToValidate);
        for (const transformation of this.transformations) {
            transformedUsername = transformation(transformedUsername);
        }
        for (const validation of this.validations) {
            if (!validation(transformedUsername)) {
                return new InvalidParamError(this.fieldName);
            }
        }
    }
}
