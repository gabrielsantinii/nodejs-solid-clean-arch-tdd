import { InvalidParamError } from "@/presentation/errors";
import { IdValidator } from "@/validation/protocols";
import { IdFieldValidation } from "@/validation/validators";

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
