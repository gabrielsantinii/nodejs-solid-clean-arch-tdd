import { CompositeValidation } from "@/presentation/protocols";
import { AddProfileValidation } from "@/validation/usecases";

export const makeProfileValidation = (): CompositeValidation<any> => {
    return new AddProfileValidation();
};
