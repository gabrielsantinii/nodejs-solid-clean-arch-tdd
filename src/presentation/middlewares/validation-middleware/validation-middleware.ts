import { Middleware, Validation, CompositeValidation, HttpResponse } from "@/presentation/protocols";
import { httpResponse } from "@/presentation/helpers";

export class ValidationMiddleware implements Middleware {
    constructor(private readonly validation: Validation | CompositeValidation<any>) {}

    handle(request: any): HttpResponse {
        try {
            let errors: Error[] = [];
            const validateError = this.validation.validate(request);
            if (Array.isArray(validateError)) {
                errors = validateError;
            } else if (validateError) {
                errors.push(validateError);
            }
            if (errors.length) return httpResponse.badRequest(errors);

            return httpResponse.ok(request);
        } catch (e) {
            return httpResponse.serverError(e as Error);
        }
    }
}
