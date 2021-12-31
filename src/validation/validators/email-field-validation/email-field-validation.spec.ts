import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

class EmailFieldValidation implements Validation {
    private readonly regExp =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    constructor(private readonly fieldName: string) {}

    validate(input: any): Error {
        const val = String(input[this.fieldName]);
        if (!val.match(this.regExp)) return new InvalidParamError(this.fieldName);
    }
}

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
