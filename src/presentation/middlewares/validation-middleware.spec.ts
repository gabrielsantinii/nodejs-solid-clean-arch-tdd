import { Validation, CompositeValidation } from "@/presentation/protocols";
import { ok, badRequest, serverError } from "@/presentation/helpers";
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

type SutType = {
    spy: ValidationSpy | CompositeValidationSpy;
    sut: ValidationMiddleware;
};

const makeSut = (spy: ValidationSpy | CompositeValidationSpy): SutType => {
    const sut = new ValidationMiddleware(spy);
    return { spy, sut };
};

describe("validation-middleware.spec usecase", () => {
    it("should return bad-request when given invalid params.", () => {
        const { sut, spy } = makeSut(new ValidationSpy());
        const httpResponse = sut.handle({});

        expect(httpResponse).toEqual(badRequest([spy.result as Error]));
    });

    it("should return bad-request using composite-validation when given invalid params", () => {
        const { sut, spy } = makeSut(new CompositeValidationSpy());
        const httpResponse = sut.handle({});

        expect(httpResponse).toEqual(badRequest(spy.result as Error[]))
    });

    it("should return ok when given validation pass.", () => {
        const { sut, spy } = makeSut(new ValidationSpy());

        spy.result = undefined;
        const httpResponse = sut.handle({});

        expect(httpResponse).toEqual(ok({}));
    });

    it("should return serverError when any method throws", () => {
        const { sut, spy } = makeSut(new ValidationSpy());

        jest.spyOn(spy, "validate").mockImplementationOnce(throwError);
        const httpResponse = sut.handle({});
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
