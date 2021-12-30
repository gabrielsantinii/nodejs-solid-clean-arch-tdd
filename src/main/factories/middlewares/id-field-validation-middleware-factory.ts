import { ValidationMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";
import { makeIdFieldValidation } from "@/main/factories/validators";

export const makeIdFieldValidationMiddleware = (fieldName: string): Middleware => {
    const middleware = new ValidationMiddleware(makeIdFieldValidation(fieldName));
    return middleware;
};
