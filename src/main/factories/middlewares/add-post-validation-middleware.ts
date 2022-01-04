import { ValidationMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";
import { makeAddPostValidation } from "@/main/factories/validations";

export const makeAddPostValidationMiddleware = (): Middleware => {
    const middleware = new ValidationMiddleware(makeAddPostValidation());
    return middleware;
};
