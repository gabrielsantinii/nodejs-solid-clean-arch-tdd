import { Validation } from "@/presentation/protocols";
import { ok, badRequest, serverError } from "@/presentation/helpers";
import { MissingParamError } from "@/presentation/errors";
import { throwError } from "@/tests/domain/mocks";
import { ValidationMiddleware } from "@/presentation/middlewares";

class ValidationSpy implements Validation {
    result: Error | undefined = new MissingParamError("any_required_field");
    validate(input: any): Error | undefined {
        return this.result;
    }
}

type SutType = {
    validationSpy: ValidationSpy;
    sut: ValidationMiddleware;
};

const makeSut = (): SutType => {
    const validationSpy = new ValidationSpy();
    const sut = new ValidationMiddleware(validationSpy);
    return { validationSpy, sut };
};

describe("validation-middleware.spec usecase", () => {
    it("should return bad-request when given invalid params.", () => {
        const { sut, validationSpy } = makeSut();
        const httpResponse = sut.handle({ any_invalid_param: "" });

        expect(httpResponse).toEqual(badRequest([validationSpy.result as Error]));
    });

    it("should return ok when given validation pass.", () => {
        const { sut, validationSpy } = makeSut();

        validationSpy.result = undefined;
        const httpResponse = sut.handle({});

        expect(httpResponse).toEqual(ok({}));
    });

    it("should return serverError when any method throws", () => {
        const { sut, validationSpy } = makeSut();

        jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
        const httpResponse = sut.handle({});
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
