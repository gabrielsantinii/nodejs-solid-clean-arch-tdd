import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { IdValidator } from "@/validation/protocols";

class IdFieldValidation implements Validation {
    constructor(private readonly fieldName: string, private readonly idValidator: IdValidator) {}

    validate(input: any): Error {
        const isValid = this.idValidator.isValid(input[this.fieldName]);
        if (!isValid) return new InvalidParamError(this.fieldName);
    }
}

class IdValidatorSpy implements IdValidator {
    result: boolean = true;
    isValid(value: string): boolean {
        return this.result;
    }
}

type SutType = {
    sut: IdFieldValidation;
    idValidatorSpy: IdValidatorSpy;
};

const makeSut = (fieldName: string): SutType => {
    const idValidatorSpy = new IdValidatorSpy();
    const sut = new IdFieldValidation(fieldName, idValidatorSpy);
    return { sut, idValidatorSpy };
};

describe("id-field-validation.spec usecase", () => {
    it("should return true for valid id field", async () => {
        const { sut } = makeSut("profileId");
        const error = sut.validate({ profileId: "any_id" });
        expect(error).toBeUndefined();
    });

    it("should return error for invalid id field", async () => {
        const { sut, idValidatorSpy } = makeSut("profileId");
        idValidatorSpy.result = false;
        const error = sut.validate({ profileId: "any_id" });
        expect(error).toEqual(new InvalidParamError("profileId"));
    });
});
