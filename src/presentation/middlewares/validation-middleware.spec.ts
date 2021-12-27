import { HttpResponse, Middleware, Validation, CompositeValidation } from "@/presentation/protocols";
import { ok, badRequest } from "@/presentation/helpers";
import { MissingParamError } from "@/presentation/errors";

class ValidationMiddleware implements Middleware {
    constructor(private readonly validation: Validation | CompositeValidation<any>) {}

    handle(request: any): HttpResponse {
        let errors: Error[] = [];
        const validateError = this.validation.validate(request);
        if (Array.isArray(validateError)) {
            errors = validateError;
        } else if (validateError) {
            errors.push(validateError);
        }
        if (errors.length) return badRequest(errors);

        return ok(request);
    }
}

class ValidationSpy implements Validation {
    result: Error | undefined = new MissingParamError("any_required_field");
    validate(input: any): Error | undefined {
        return this.result;
    }
}

describe("validation-middleware.spec usecase", () => {
    it("should return bad-request when given invalid params.", async () => {
        const validationSpy = new ValidationSpy();
        const sut = new ValidationMiddleware(validationSpy);
        const httpResponse = sut.handle({ any_invalid_param: "" });

        expect(httpResponse).toEqual(badRequest([validationSpy.result as Error]));
    });

    it("should return ok when given validation pass.", async () => {
        const validationSpy = new ValidationSpy();
        const sut = new ValidationMiddleware(validationSpy);
        validationSpy.result = undefined
        const httpResponse = sut.handle({});

        expect(httpResponse).toEqual(ok({}));
    });
});
