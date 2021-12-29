import { Validation, CompositeValidation } from "@/presentation/protocols";
import { httpResponse } from "@/presentation/helpers";
import { ValidationMiddleware } from "@/presentation/middlewares";
import { MissingParamError } from "@/presentation/errors";
import { throwError } from "@/tests/domain/mocks";

class ValidationSpy implements Validation {
    result: Error | undefined = new MissingParamError("any_required_field");
    validate(input: any): Error | undefined {
        return this.result;
    }
}

class CompositeValidationSpy implements CompositeValidation<any> {
    readonly fields = ["any_field"];
    result: Error[] = [new MissingParamError("any_field")];
    validate(input: any): Error[] {
        return this.result;
    }
}

const makeSut = (spy: ValidationSpy | CompositeValidationSpy): ValidationMiddleware => {
    const sut = new ValidationMiddleware(spy);
    return sut;
};

describe("validation-middleware.spec usecase", () => {
    it("should return bad-request when given invalid params.", () => {
        const validationSpy = new ValidationSpy();
        const sut = makeSut(validationSpy);
        const middlewareResponse = sut.handle({});

        expect(middlewareResponse).toEqual(httpResponse.badRequest([validationSpy.result as Error]));
    });

    it("should return bad-request using composite-validation when given invalid params", () => {
        const compositeValidationSpy = new CompositeValidationSpy();
        const sut = makeSut(compositeValidationSpy);
        const middlewareResponse = sut.handle({});

        expect(middlewareResponse).toEqual(httpResponse.badRequest(compositeValidationSpy.result));
    });

    it("should return ok when given validation pass.", () => {
        const validationSpy = new ValidationSpy();
        const sut = makeSut(validationSpy);

        validationSpy.result = undefined;
        const middlewareResponse = sut.handle({});

        expect(middlewareResponse).toEqual(httpResponse.ok({}));
    });

    it("should return serverError when any method throws", () => {
        const validationSpy = new ValidationSpy();
        const sut = makeSut(validationSpy);

        jest.spyOn(validationSpy, "validate").mockImplementationOnce(throwError);
        const middlewareResponse = sut.handle({});
        expect(middlewareResponse).toEqual(httpResponse.serverError(new Error()));
    });
});
