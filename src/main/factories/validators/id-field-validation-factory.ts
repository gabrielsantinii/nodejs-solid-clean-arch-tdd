import { IdValidatorAdapter } from "@/infra/validators";
import { Validation } from "@/presentation/protocols";
import { IdFieldValidation } from "@/validation/validators";

export const makeIdFieldValidation = (fieldName: string): Validation => {
    return new IdFieldValidation(fieldName, new IdValidatorAdapter());
};
