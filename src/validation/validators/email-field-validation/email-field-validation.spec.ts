import { InvalidParamError } from "@/presentation/errors";
import { EmailFieldValidation } from "@/validation/validators";

type SutType = {
    sut: EmailFieldValidation;
};

const makeSut = (fieldName: string): SutType => {
    const sut = new EmailFieldValidation(fieldName);
    return { sut };
};

describe("email-field-validation.spec usecase", () => {
    it("should return void for valid email.", async () => {
        const { sut } = makeSut("email");
        const error = sut.validate({ email: "foo@example.com" });
        expect(error).toBeUndefined();
    });

    it("should return invalida param error for invalid email.", async () => {
        const { sut } = makeSut("email");
        const error = sut.validate({ email: "fooexample.com" });
        expect(error).toEqual(new InvalidParamError("email"));
    });
});
