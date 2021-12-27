import { MissingParamError } from "@/presentation/errors";
import { RequiredFieldValidation } from "@/validation/validators";

type SutType = {
    sut: RequiredFieldValidation;
    fieldToValidate: string;
};

const makeSut = (fieldToValidate: string): SutType => {
    const sut = new RequiredFieldValidation(fieldToValidate);
    return { sut, fieldToValidate };
};

describe("required-field-validation.spec usecase", () => {
    it("should statements return MissingParamError if the input hasnt the field to validate.", async () => {
        const { sut, fieldToValidate } = makeSut("email");
        const error = sut.validate({ "e-mail": "test@example.com" });
        expect(error).toEqual(new MissingParamError(fieldToValidate));
    });

    it("should statements return undefined if the input has the field to validate.", async () => {
        const { sut } = makeSut("email");
        const error = sut.validate({ email: "test@example.com" });
        expect(error).toBe(undefined);
    });
});
