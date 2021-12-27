import { MissingParamError } from "@/presentation/errors";

class RequiredFieldValidation {
    constructor(private readonly fieldName: string) {}

    validate(input: any): Error | undefined {
        if (!input[this.fieldName]) return new MissingParamError(this.fieldName);

        return undefined;
    }
}

describe("required-field-validation.spec usecase", () => {
    it("should statements return MissingParamError if the input hasnt the field to validate.", async () => {
        const fieldToValidate = "email";
        const sut = new RequiredFieldValidation(fieldToValidate);
        const error = sut.validate({ "e-mail": "test@example.com" });
        expect(error).toEqual(new MissingParamError(fieldToValidate));
    });

    it("should statements return undefined if the input has the field to validate.", async () => {
        const fieldToValidate = "email";
        const sut = new RequiredFieldValidation(fieldToValidate);
        const error = sut.validate({ "email": "test@example.com" });
        expect(error).toBe(undefined);
    });
});
