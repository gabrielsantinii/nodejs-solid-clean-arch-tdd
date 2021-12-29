import { makeProfileValidation } from "@/main/factories/validations";
import { ValidationMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";

export const makeAddProfileValidationMiddleware = (): Middleware => {
    const middleware = new ValidationMiddleware(makeProfileValidation());
    return middleware;
};
