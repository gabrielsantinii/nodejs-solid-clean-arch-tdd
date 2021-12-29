import { makeAccountValidation } from "@/main/factories/validations";
import { ValidationMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";

export const makeAddAccountValidationMiddleware = (): Middleware => {
    const middleware = new ValidationMiddleware(makeAccountValidation());
    return middleware;
};
